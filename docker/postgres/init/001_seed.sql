-- Demo manufacturing monitoring seed data

INSERT INTO factories (
    id,
    name,
    location
)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Demo Manufacturing Plant',
    'Bangalore'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO printers (
    id,
    name,
    model,
    serial_number,
    factory_id
)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    'Printer-001',
    'Prusa MK4',
    'PRINTER-DEMO-001',
    '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO sensors (
    id,
    type,
    serial_number,
    printer_id
)
VALUES
(
    '33333333-3333-3333-3333-333333333333',
    'temperature',
    'SENSOR-TEMP-001',
    '22222222-2222-2222-2222-222222222222'
),
(
    '44444444-4444-4444-4444-444444444444',
    'vibration',
    'SENSOR-VIB-001',
    '22222222-2222-2222-2222-222222222222'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO sensor_readings (
    id,
    value,
    recorded_at,
    sensor_id
)
VALUES
(
    '55555555-5555-5555-5555-555555555555',
    42.5,
    NOW(),
    '33333333-3333-3333-3333-333333333333'
),
(
    '66666666-6666-6666-6666-666666666666',
    0.15,
    NOW(),
    '44444444-4444-4444-4444-444444444444'
);