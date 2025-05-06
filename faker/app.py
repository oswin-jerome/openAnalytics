import psycopg2
from faker import Faker
import uuid
from datetime import datetime, timedelta
import random
import json

faker = Faker()
conn = psycopg2.connect("dbname=openAnalytics user=oswinjerome password=password")
cur = conn.cursor()
browsers = ["Chrome", "Firefox", "Safari", "Edge", "Brave"]
devices = ["Desktop", "Mobile", "Tablet"]
os = ["Windows", "macOS", "Linux", "Android", "iOS"]
project_id = "15d58e0e-c4c0-4a00-83c0-e78a997a8f58"

for day_offset in range(365):
    session_id = str(uuid.uuid4())
    session_created = datetime.now() - timedelta(days=day_offset)
    user_agent = random.choice(browsers)
    ip = faker.ipv4()
    meta =  json.dumps({
				"browser": random.choice(browsers),
				"device": random.choice(devices),
				"user_agent": faker.user_agent(),
                "os": random.choice(os),
			})

    cur.execute("""
        INSERT INTO sessions (id, created_at, updated_at, session_id, user_agent, ip_address, meta_data, project_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s::jsonb, %s)
    """, (
        session_id,
        session_created,
        session_created,
        session_id,
        user_agent,
        ip,
        meta,
        project_id
    ))

    for _ in range(random.randint(500, 600)):
        event_id = str(uuid.uuid4())
        event_created = session_created + timedelta(seconds=random.randint(0, 3600))
        event_type = random.choice(["page_view", "click", "submit", "navigate"])
        event_name = faker.word()
        page = faker.uri_path()
        url = faker.url()
        referrer = faker.url()
        meta_data = json.dumps({"component": faker.word(), "value": random.randint(1, 100)})

        cur.execute("""
            INSERT INTO events (id, created_at, session_id, project_id, name, event_type, page, url, referrer, meta_data)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb)
        """, (
            event_id,
            event_created,
            session_id,
            project_id,
            event_name,
            event_type,
            page,
            url,
            referrer,
            meta_data
        ))

    print(f"Day {day_offset + 1}/365: Inserted session and events")

conn.commit()
cur.close()
conn.close()
