// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.

let srcUrl = `url(data:font/woff2;base64,d09GMgABAAAAAAOgAAoAAAAABowAAANXAwEDAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAPAqFWIQsATYCJAMQCwoABCAFgzQHIBslBQiOwnGvhGIyecXij+ehtfb+7OxhEpJl82TaLUOFTFtqpFEp5ULFM39Pp71fKFLbzd1s7VRmUpkHAJm4JuhHcvVERzob0L89LRqHVTiKBBvp7HGVIOvz1CIa0N4mGkLHWJSYmURnW6h5jHqgJVcoBcBp4f9ATkO+aBso+KT/Yf860BsOfo5+8kYHhQdB3sAOCGQHLQIzANEIRlXLwKBBhc/Rj4c+eQuFuR8ljeJA3gbhoOr1QbT4ABkULEcUZUdJicdLHYS8oJqgq9Hmesgg4Ybvds3V8iPYztntcrSosltxHNvnfip4CE1rrTHbprFDa4K3Qm2len7IEnOEFSxz3GovDqMqKzDZJQmEoAG5QVY7J3QY1bKDFmRhQIY4xBYdJhBWYGOqMm3MAVmRUdagCmkFZxhDY6qRBwio3Xqfwqw2Ggiwhwo5nDXyY5qrd2zUg1ZCp7FKZVELfKxBZy4OYu50OW6zH9XahsbvlUFts6zinB5nOMWZK+VG9xKEdq3QNTWruVp1Sf2wEZ6Gs8f5mPU+6KyCTqtJSACnc44Kjg7a9tpxKBxcFjaSPKB8ub9/qkaGctg1M1NCxLN3vzrxBr8iy14UIxLO3dv48IHpo6NiT87GPgfecnfTsn+XPiTGLFw6s5cSyvLzY4YR7p3TXmAKPlxM6ZFOCYOKZWRSLn70Z+pJSFLjxMmDxaMGMf15ssIPPYrEh/8CquC/v1I9jj+stdplDhavIUaOb1DZpkMrVmDcDCSFcZ2bcLyJLyjGFUocD2+qoS0d2tyaiXFXQH9eOWnC3GJCIFD9ecoCzN9DDI3eoIxDm3YscbFMJMk94SjgpyngqUEO1BWHN5WWU9T9SsbH4PMBIDQRheeHbO9YitU3KWkRgP7TnpA0LVT4Vbiz9KAHAAYVdVC+OFY6YePGq9ID8ZtqakBB2QMoHUxDqJUHagBB1NMG3BGVKg2sA0qJXcZKMe5RaZyo6KxSpXXv8L561qMKjvgESuVJlypNAZy6RBpwLvhymO+zVyxZPr5syfwwnCmcgzzxciQBiQtwTFUoS3w12S67ch2mdBn0lSGS5cmXbhrDmUkcmNOlbxmQJn4hjxkTOHWXu4vMei3glzwa+lq+2/RVZzpBUY2r/zvkAA==)`;

if (!document.fonts.check("1rem share-button-combined")) {
  var font = new FontFace(
    "share-button-combined",
    srcUrl,
    { style: 'normal', weight: '400' }
  );
  await font.load();
  document.fonts.add(font);
}
// Work around a Gecko/Firefox issue with dynamic fonts and Shadow DOM by
// adding all of this via script tag instead
if (
  navigator.userAgent.includes("Gecko") &&
  navigator.userAgent.includes("Firefox")
) {
  let styleEl = document.createElement("style");
  styleEl.innerText = `
    @font-face {
      font-family: "share-button-combined";
      font-display: block;
      src: ${srcUrl} format("woff2");
    }
  `;
  document.head.appendChild(styleEl);
}

let _styleMap = new Map();
let addStyles = (doc, styles) => {
  let s = _styleMap.get(styles);
  if (!s) {
    try {
      s = {
        type: "CSS",
        value: new CSSStyleSheet()
      }
      s.value.replaceSync(styles);
    } catch(e) {
      s = {
        type: "sheet",
        value: styles
      };
    }
    switch(s.type) {
      case "sheet":
        let sheet = doc.createElement("style");
        sheet.textContent = s.value;
        doc.appendChild(sheet);
        break;
      case "CSS":
        doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, s.value];
        break;
    };
  }
}

class ShareButton extends HTMLElement {

  static fontUrl = srcUrl;

  static styles = `
    button {
      all: unset;

      font-family: share-button-combined;

      display: inline-block;
      padding: 0.5rem 0.75rem;
      border-radius: 0.2rem;
      cursor: pointer;
      will-change: transform;
      transition: all 0.3s;
    }

    button:focus {
      outline: 2px solid currentColor;
      outline-style: auto;
    }

    button:hover {
      background: #79b4ff;
      transform: scale(1.2);
    }
  `;

  static template = (() => {
    document.body.insertAdjacentHTML("beforeend", `
    <template>
      <button
        part="share-button"
        class="share"
        aria-label="Share"
        title="Share"
        id="share">
        &#xF14D
      </button>
      <button
        part="tweet-button"
        class="tweet"
        aria-label="Share on Twitter"
        title="Share on Twitter"
        id="tweet">
        &#xF099
      </button>
      <button
        part="copy-link-button"
        class="copy-link"
        aria-label="Copy link to this article"
        title="Copy link to this article"
        id="copy">
        &#xF0C1
      </button>
    </template>`);
    return document.body.lastElementChild;
  })();

  static get observedAttributes() {
    return [
      "url",
      "title",
      "text",
      "image",
    ];
  }

  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });
    this.url = "";
    this.title = "";
    this.text = "";
    this.image = "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(ShareButton.observedAttributes.includes(name) &&
       oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  #imageDataFile = null;

  async #getImageDataFile() {

    if (!this.image) { return; }

    try {
      if (!this.#imageDataFile) {
        let name = (new URL(this.image)).pathname.split("/").pop();
        let response = await fetch(this.image);
        let imageData = await response.blob();

        this.#imageDataFile = new File(
          [imageData],
          name,
          {
            type: imageData.type,
            lastModified: new Date().getTime()
          }
        );
      }
      return this.#imageDataFile;
    } catch(e) {
      console.log(e);
    }
  }

  #success(evt) {
    // TODO: fire an event or trigger a CSS change to animate success
  }

  get _url() {
    return (this.url || window.location);
  }

  get _title() {
    return (this.title || document.title);
  }

  get _fullText() {
    return `"${this._title}${
      (this.text ? (': '+this.text) : "" )
    }"\n\n`;
  }

  async share(evt) {
    let shareData = {
      url: this._url,
      title: this._title,
      text: this.text
    };

    if (this.image) {
      let file = await this.#getImageDataFile();
      shareData.files = [ file ];
    }

    try {
      await navigator.share(shareData);
      this.dispatchEvent(new CustomEvent("share", {
        detail: shareData,
        bubbles: true,
        composed: true
      }));
      this.#success(evt);
    } catch(e) {
      console.error("share-button share failed:", e);
    }
  }

  async tweet(evt) {
    let url = new URL("/intent/tweet", "https://twitter.com");
    url.searchParams.set("url", this._url);
    url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "twitterShare", "popup,noopener");
    this.#success(evt);
  }

  async copyLink(evt) {
    try {
      navigator.clipboard.writeText(`${this._fullText}${this._url}`);
      this.#success(evt);
    } catch(e) {
      console.error(e);
    }
  }

  connectedCallback() {
    addStyles(this.shadowRoot, ShareButton.styles);
    this.shadowRoot.appendChild(ShareButton.template.content.cloneNode(true));
    let share = this.shadowRoot.getElementById("share")
    if (navigator.share) {
      share.addEventListener("click", this.share.bind(this));
    } else {
      share.style.display = "none";
    }
    this.shadowRoot.getElementById("tweet").addEventListener("click", this.tweet.bind(this));
    this.shadowRoot.getElementById("copy").addEventListener("click", this.copyLink.bind(this));
  }
}
customElements.define("share-button", ShareButton);

export default ShareButton;