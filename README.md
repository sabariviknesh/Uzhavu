# Uzhavu website

A static website (no build step). `index.html` is the main page.

```
index.html          main page
css/style.css       all styling
js/app.js           products, prices, cart and WhatsApp ordering
images/             logos and product pouch images (images/products/)
```

## Things you will edit most often (js/app.js)
- `WA` (top of the file): the WhatsApp business number, country code first, no + or spaces.
- `P` (product list): name, Tamil name, price, weight and group for each product. The image for each product is the one at the same position in `IMG`.
- To change a product photo, replace the file in `images/products/` and keep the same file name.
- FSSAI number, address and Instagram link are in the footer of `index.html`.

## Put it on GitHub
1. Create a new repository on github.com (for example `uzhavu-website`).
2. Click **Add file > Upload files** and drag in the **contents** of this folder (index.html, css, js, images, README.md), not a zip. `index.html` must be at the top level of the repository.
3. Click **Commit changes**.

## Host it on Vercel
1. Sign in to vercel.com with your GitHub account.
2. Click **Add New > Project**, pick the repository, and import it.
3. Framework Preset: **Other**. Leave the build command and output directory empty. Click **Deploy**.
4. Every time you change a file in GitHub, Vercel updates the site automatically.

## Use your own domain
In Vercel, open the project, go to **Settings > Domains**, add your domain (for example uzhavu.in) and follow the DNS steps shown there.
