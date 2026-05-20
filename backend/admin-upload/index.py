import json
import os
import base64
import uuid
import boto3

ADMIN_PASSWORD = "Admin2005"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
}

ALLOWED_TYPES = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif"}


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def check_password(event: dict) -> bool:
    headers = event.get("headers") or {}
    pwd = headers.get("X-Admin-Password") or headers.get("x-admin-password") or ""
    return pwd == ADMIN_PASSWORD


def handler(event: dict, context) -> dict:
    """Загрузка изображения в S3 для администратора. Требует заголовок X-Admin-Password."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if not check_password(event):
        return {
            "statusCode": 401,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Неверный пароль"}),
        }

    body = json.loads(event.get("body") or "{}")
    data_b64 = body.get("data")
    content_type = body.get("content_type", "image/jpeg")

    if not data_b64:
        return {
            "statusCode": 400,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Нужен base64 data"}),
        }

    if content_type not in ALLOWED_TYPES:
        content_type = "image/jpeg"

    ext = ALLOWED_TYPES[content_type]
    file_key = f"admin-uploads/{uuid.uuid4()}.{ext}"

    image_data = base64.b64decode(data_b64)

    s3 = get_s3()
    s3.put_object(
        Bucket="files",
        Key=file_key,
        Body=image_data,
        ContentType=content_type,
    )

    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/files/{file_key}"

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "url": cdn_url}),
    }
