# Publish Blog API Integration Guide

This guide describes how to securely, reliably, and dynamically push complete, high-speed, SEO-friendly blog posts with custom image/video media to **The AI Call** website via the `publish-blog` Edge Function.

This endpoint supports **both** standard JSON payloads and direct file uploads using `multipart/form-data`.

---

## 1. Direct File Upload Support (`multipart/form-data`)

You can now upload images and video files **directly** through the API! 
When you make a `multipart/form-data` request, the API automatically:
1. Validates and ensures a public Supabase Storage bucket named `blog-media` exists.
2. Uploads the files using secure binary buffer streams under `images/` or `videos/`.
3. Sets the resulting public URLs directly on your blog database entry.

### API Parameters for File Uploads

When using `multipart/form-data`, supply the following fields:

| Field Name | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `title` | Text | **Yes** | The blog title. |
| `content` | Text (HTML/MD) | **Yes** | Complete body content. Supports rich HTML, tables, quotes, etc. |
| `excerpt` | Text | No | Short description (150-160 characters) used for SEO meta descriptions. |
| `status` | Text | No | Options: `'published'`, `'draft'`. Defaults to `'published'`. |
| `featured_image` | **File (Binary)** | No | Binary file of your blog's cover photo. Automatically uploaded to Storage. |
| `video` | **File (Binary)** | No | Binary file of your custom video demo. Automatically uploaded to Storage. |
| `featured_image_url` | Text | No | External fallback/string URL for the image (used if `featured_image` file is omitted). |
| `video_url` | Text | No | External fallback/string URL (e.g. YouTube/Vimeo) (used if `video` file is omitted). |
| `author_id` | Text (UUID) | No | Optional UUID of the author. |

---

## 2. Code Examples for Direct File Uploads

Here is how to upload direct media files along with your blog post content using your preferred language or terminal.

### Option A: curl (Command Line)
To upload a local image and video file along with your text fields, run:
```bash
curl -X POST https://goycrjqlfmwzigimawti.supabase.co/functions/v1/publish-blog \
  -H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \
  -F "title=Revolutionizing Real Estate with Voice AI" \
  -F "content=<p>Voice assistants are qualifying leads in under 3 seconds...</p>" \
  -F "excerpt=How voice AI speeds up lead response times for real estate brokers." \
  -F "featured_image=@/path/to/my-cover.webp" \
  -F "video=@/path/to/my-demo-video.mp4"
```

### Option B: Python (Direct Upload Script)
```python
import requests

API_URL = "https://goycrjqlfmwzigimawti.supabase.co/functions/v1/publish-blog"
SERVICE_ROLE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"

# Text fields
data = {
    "title": "Scaling Appointments via Automated AI Receptionists",
    "content": "<p>Medical clinics eliminate missed appointments by answering 100% of triage calls...</p>",
    "excerpt": "A technical roadmap to migrating support lines to HIPAA-compliant voice LLMs.",
    "status": "published"
}

# Local file binaries
files = {
    "featured_image": ("cover.jpg", open("path/to/cover.jpg", "rb"), "image/jpeg"),
    "video": ("demo.mp4", open("path/to/demo.mp4", "rb"), "video/mp4")
}

headers = {
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}"
}

# requests.post handles boundary generation and binary transfer automatically
response = requests.post(API_URL, data=data, files=files, headers=headers)

if response.status_code == 200:
    print("Success! Blog and media uploaded:", response.json())
else:
    print(f"Failed {response.status_code}:", response.text)
```

### Option C: Node.js / JavaScript (Direct Upload Script)
```javascript
const fs = require('fs');
const path = require('path');

const API_URL = "https://goycrjqlfmwzigimawti.supabase.co/functions/v1/publish-blog";
const SERVICE_ROLE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY";

async function uploadBlogWithFiles() {
  const formData = new FormData();
  
  // Append text fields
  formData.append("title", "Voice Recognition Latency Tuning in 2026");
  formData.append("content", "<p>Achieving sub-800ms latency is the holy grail of human-like call flows.</p>");
  formData.append("excerpt", "Vetting conversational latency optimization inside Retell and Vapi architectures.");
  
  // Append file streams/blobs
  const imageStream = fs.createReadStream(path.join(__dirname, 'cover.webp'));
  formData.append("featured_image", imageStream, "cover.webp");
  
  const videoStream = fs.createReadStream(path.join(__dirname, 'demo.mp4'));
  formData.append("video", videoStream, "demo.mp4");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: formData // Node-fetch/W3C fetch sets multipart headers & boundary automatically
    });

    const result = await res.json();
    console.log(result);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}

uploadBlogWithFiles();
```

---

## 3. Alternative: Standard JSON Payload

If you are not uploading raw files and already have media URLs hosted externally (e.g. Unsplash images, YouTube videos), you can send a standard JSON payload.

> [!WARNING]
> If you raw-interpolate HTML/Markdown containing double quotes (`"`) or backslashes (`\`) directly in curl/Zapier text strings, it breaks JSON structure. Ensure you use proper serialization.

### Example JSON Payload
```json
{
  "title": "My SEO Blog Post",
  "content": "<p>This is blog content containing <a href=\"https://example.com\">properly escaped</a> quotes.</p>",
  "excerpt": "A short summary for search engine snippets.",
  "featured_image_url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  "video_url": "https://www.youtube.com/watch?v=8o4k9BqD2Kk",
  "status": "published"
}
```

---

## 4. Setting Up uploads in No-Code Tools (Zapier / Make)

### Direct Uploads (Zapier)
1. **Choose Action:** **Webhooks by Zapier** -> **POST**
2. **URL:** `https://goycrjqlfmwzigimawti.supabase.co/functions/v1/publish-blog`
3. **Payload Type:** Set to **form** (which generates standard `multipart/form-data`).
4. **Data:**
   * Create keys: `title`, `content`, `excerpt`, `status`.
   * Create file key `featured_image`: Pass a **File object** or file download URL from your trigger app (e.g., Google Drive "File" field).
   * Create file key `video`: Pass a **File object** or file download URL.

### JSON-Based Serialization (Make / Integromat)
If syncing JSON, use **Raw JSON (application/json)** and use Make's internal variables. Make handles character escaping automatically under the hood to ensure full blog body texts transfer without truncation.
