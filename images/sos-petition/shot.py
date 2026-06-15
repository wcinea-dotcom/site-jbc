from playwright.sync_api import sync_playwright
import os
path="file://"+os.path.abspath("lettre-ouverte-public.html")
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={"width":1280,"height":900})
    pg.goto(path); pg.wait_for_timeout(2000)
    pg.screenshot(path="/sessions/happy-dreamy-goldberg/mnt/outputs/full.jpg", full_page=True, quality=68, type="jpeg")
    b.close()
print("ok")
