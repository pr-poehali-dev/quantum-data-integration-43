import json
import os
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p64733094_quantum_data_integra")
ADMIN_PASSWORD = "Admin2005"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def check_password(event: dict) -> bool:
    headers = event.get("headers") or {}
    pwd = headers.get("X-Admin-Password") or headers.get("x-admin-password") or ""
    return pwd == ADMIN_PASSWORD


def handler(event: dict, context) -> dict:
    """Получение и обновление URL изображений сайта. Требует заголовок X-Admin-Password."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    # GET — публичный, отдаёт все изображения для сайта
    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT slot, url, label FROM {SCHEMA}.site_images ORDER BY id")
        rows = cur.fetchall()
        conn.close()
        images = {row[0]: {"url": row[1], "label": row[2]} for row in rows}
        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps(images),
        }

    # POST — обновление, требует пароль
    if method == "POST":
        if not check_password(event):
            return {
                "statusCode": 401,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Неверный пароль"}),
            }

        body = json.loads(event.get("body") or "{}")
        slot = body.get("slot")
        url = body.get("url")

        if not slot or not url:
            return {
                "statusCode": 400,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Нужны slot и url"}),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.site_images SET url = %s, updated_at = NOW() WHERE slot = %s",
            (url, slot),
        )
        conn.commit()
        conn.close()

        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"ok": True, "slot": slot, "url": url}),
        }

    return {
        "statusCode": 405,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"error": "Method not allowed"}),
    }