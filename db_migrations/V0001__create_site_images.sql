CREATE TABLE t_p64733094_quantum_data_integra.site_images (
    id SERIAL PRIMARY KEY,
    slot VARCHAR(64) NOT NULL UNIQUE,
    url TEXT NOT NULL,
    label VARCHAR(128),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p64733094_quantum_data_integra.site_images (slot, url, label) VALUES
  ('hero_slide_1', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg', 'Слайд 1 (главный экран)'),
  ('hero_slide_2', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7832caa6-7685-4b62-801f-750660e099ac.jpg', 'Слайд 2 (главный экран)'),
  ('hero_slide_3', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7008a70d-944a-4339-a6d9-5e2368fed57e.jpg', 'Слайд 3 (главный экран)'),
  ('section_adults', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg', 'Секция взрослых'),
  ('section_kids', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7832caa6-7685-4b62-801f-750660e099ac.jpg', 'Секция детей'),
  ('section_personal', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7008a70d-944a-4339-a6d9-5e2368fed57e.jpg', 'Индивидуальные тренировки'),
  ('cta_background', 'https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg', 'Фон финального экрана');
