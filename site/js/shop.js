/**
 * Shop page — renders product cards from data/products.json.
 *
 * TO ADD A PRODUCT: append a new object to data/products.json with:
 *   id, title, price, description, imageUrl, stripePaymentLink
 *
 * TO USE STRIPE: replace "#" in stripePaymentLink with your Stripe Payment Link URL, e.g.
 *   "https://buy.stripe.com/your-link-here"
 *
 * TO USE CUSTOM IMAGES: set imageUrl to a path under public/, e.g.
 *   "/assets/images/your-product.jpg"
 */

const PRODUCTS_URL = "/data/products.json";
const GRID_SELECTOR = "#shop-grid";
const STATUS_SELECTOR = "#shop-status";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** @param {{ id: string, title: string, price: number, description: string, imageUrl: string, stripePaymentLink: string }} product */
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productId = product.id;

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-card__image";

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.title;
  image.width = 400;
  image.height = 400;
  image.loading = "lazy";
  imageWrap.appendChild(image);

  const body = document.createElement("div");
  body.className = "product-card__body";

  const title = document.createElement("h3");
  title.className = "product-card__title";
  title.textContent = product.title;

  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = priceFormatter.format(product.price);

  const description = document.createElement("p");
  description.className = "product-card__description";
  description.textContent = product.description;

  const buyLink = document.createElement("a");
  buyLink.className = "btn btn--block product-card__buy";
  buyLink.href = product.stripePaymentLink;
  buyLink.textContent = "Buy Now";

  // Open real Stripe checkout in a new tab; keep placeholder "#" on the same page
  if (product.stripePaymentLink && product.stripePaymentLink !== "#") {
    buyLink.target = "_blank";
    buyLink.rel = "noopener noreferrer";
  }

  body.append(title, price, description, buyLink);
  card.append(imageWrap, body);

  return card;
}

function setStatus(message, isError = false) {
  const status = document.querySelector(STATUS_SELECTOR);
  if (!status) return;
  status.textContent = message;
  status.hidden = !message;
  status.classList.toggle("shop-status--error", isError);
}

async function renderShop() {
  const grid = document.querySelector(GRID_SELECTOR);
  if (!grid) return;

  setStatus("Loading products…");

  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`Could not load products (${response.status})`);
    }

    const products = await response.json();

    grid.replaceChildren();

    if (products.length === 0) {
      setStatus("No products available right now. Check back soon!");
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const product of products) {
      fragment.appendChild(createProductCard(product));
    }
    grid.appendChild(fragment);
    setStatus("");
  } catch (error) {
    console.error("[shop]", error);
    setStatus("Unable to load products. Please refresh or contact us to order.", true);
  }
}

renderShop();
