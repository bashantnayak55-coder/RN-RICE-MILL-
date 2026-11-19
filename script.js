const products = {
  "White Rice": "Our everyday rice option, suitable for family meals and regular cooking. Contact us for available grades, packaging and wholesale pricing.",
  "Brown Rice": "Brown rice with its natural outer layer retained. Ask us about availability, packaging and bulk supply.",
  "Basmati Rice": "A fragrant long-grain rice variety suitable for a range of dishes. Contact RN Rice Mill for product specifications and supply options.",
  "Rice Bran & Rice Husk": "Rice milling by-products available subject to stock. Contact us to discuss intended use and quantity."
};

const cart = [];
const productButtons = document.querySelectorAll(".detail-btn");
const infoDialog = document.querySelector("#infoDialog");
const searchDialog = document.querySelector("#searchDialog");
const quoteDialog = document.querySelector("#quoteDialog");

productButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    document.querySelector("#dialogTitle").textContent = product;
    document.querySelector("#dialogText").textContent = products[product] || "Please contact us for more information.";
    infoDialog.showModal();
    document.querySelector("#dialogContact").onclick = () => {
      infoDialog.close();
      addToQuote(product);
    };
  });
});

function addToQuote(product) {
  if (!cart.includes(product)) cart.push(product);
  document.querySelector("#cartCount").textContent = cart.length;
  document.querySelector("#quoteText").textContent = cart.length
    ? "Products you're interested in: " + cart.join(", ") + ". Please contact us to request pricing."
    : "Your quote list is currently empty.";
}

document.querySelector("#cartBtn").addEventListener("click", () => {
  document.querySelector("#quoteText").textContent = cart.length
    ? "Products you're interested in: " + cart.join(", ") + ". Please contact us to request pricing."
    : "Your quote list is currently empty.";
  quoteDialog.showModal();
});

document.querySelector("#searchBtn").addEventListener("click", () => {
  searchDialog.showModal();
  document.querySelector("#searchInput").focus();
});
document.querySelector("#searchInput").addEventListener("input", event => {
  const term = event.target.value.trim().toLowerCase();
  const results = document.querySelector("#searchResults");
  results.innerHTML = "";
  if (!term) return;
  const matches = Object.keys(products).filter(name => name.toLowerCase().includes(term));
  matches.forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;
    button.addEventListener("click", () => {
      searchDialog.close();
      document.querySelector(`[data-product="${name}"]`).click();
    });
    results.appendChild(button);
  });
  if (!matches.length) results.textContent = "No matching products found.";
});

document.querySelector("#menuToggle").addEventListener("click", () => {
  document.querySelector("#navMenu").classList.toggle("open");
});
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => document.querySelector("#navMenu").classList.remove("open"));
});
document.querySelector("#closeDialog").addEventListener("click", () => infoDialog.close());
document.querySelector("#closeSearch").addEventListener("click", () => searchDialog.close());
document.querySelector("#closeQuote").addEventListener("click", () => quoteDialog.close());
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#customerName").value.trim();
  const email = document.querySelector("#customerEmail").value.trim();
  const message = document.querySelector("#message").value.trim();
  const subject = encodeURIComponent("RN Rice Mill enquiry");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}\nInterested products: ${cart.join(", ") || "Not selected"}`);
  window.location.href = `mailto:info@rnricemill.com?subject=${subject}&body=${body}`;
});
