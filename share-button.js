import { LitElement, html, css } from "lit-html";

// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let ruleText = `
  @font-face {
    font-family: share-button-combined;
    src: url(data:font/woff2;base64,d09GMgABAAAAAAOgAAoAAAAABowAAANXAwEDAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAPAqFWIQsATYCJAMQCwoABCAFgzQHIBslBQiOwnGvhGIyecXij+ehtfb+7OxhEpJl82TaLUOFTFtqpFEp5ULFM39Pp71fKFLbzd1s7VRmUpkHAJm4JuhHcvVERzob0L89LRqHVTiKBBvp7HGVIOvz1CIa0N4mGkLHWJSYmURnW6h5jHqgJVcoBcBp4f9ATkO+aBso+KT/Yf860BsOfo5+8kYHhQdB3sAOCGQHLQIzANEIRlXLwKBBhc/Rj4c+eQuFuR8ljeJA3gbhoOr1QbT4ABkULEcUZUdJicdLHYS8oJqgq9Hmesgg4Ybvds3V8iPYztntcrSosltxHNvnfip4CE1rrTHbprFDa4K3Qm2len7IEnOEFSxz3GovDqMqKzDZJQmEoAG5QVY7J3QY1bKDFmRhQIY4xBYdJhBWYGOqMm3MAVmRUdagCmkFZxhDY6qRBwio3Xqfwqw2Ggiwhwo5nDXyY5qrd2zUg1ZCp7FKZVELfKxBZy4OYu50OW6zH9XahsbvlUFts6zinB5nOMWZK+VG9xKEdq3QNTWruVp1Sf2wEZ6Gs8f5mPU+6KyCTqtJSACnc44Kjg7a9tpxKBxcFjaSPKB8ub9/qkaGctg1M1NCxLN3vzrxBr8iy14UIxLO3dv48IHpo6NiT87GPgfecnfTsn+XPiTGLFw6s5cSyvLzY4YR7p3TXmAKPlxM6ZFOCYOKZWRSLn70Z+pJSFLjxMmDxaMGMf15ssIPPYrEh/8CquC/v1I9jj+stdplDhavIUaOb1DZpkMrVmDcDCSFcZ2bcLyJLyjGFUocD2+qoS0d2tyaiXFXQH9eOWnC3GJCIFD9ecoCzN9DDI3eoIxDm3YscbFMJMk94SjgpyngqUEO1BWHN5WWU9T9SsbH4PMBIDQRheeHbO9YitU3KWkRgP7TnpA0LVT4Vbiz9KAHAAYVdVC+OFY6YePGq9ID8ZtqakBB2QMoHUxDqJUHagBB1NMG3BGVKg2sA0qJXcZKMe5RaZyo6KxSpXXv8L561qMKjvgESuVJlypNAZy6RBpwLvhymO+zVyxZPr5syfwwnCmcgzzxciQBiQtwTFUoS3w12S67ch2mdBn0lSGS5cmXbhrDmUkcmNOlbxmQJn4hjxkTOHWXu4vMei3glzwa+lq+2/RVZzpBUY2r/zvkAA==);
  }
`;

try{
  let shareFont = new CSSStyleSheet();
  shareFont.replaceSync(ruleText);
  document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets, 
    shareFont
  ];
} catch(e) {
  // Safari is the WORST
  let sheet = document.createElement("style");
  sheet.innerHTML = ruleText;
  document.head.appendChild(sheet);
}

class ShareButton extends LitElement {

  static styles = css`
    button {
      all: unset;

      font-family: share-button-combined;

      display: inline-block;
      padding: 0.5rem 0.75rem;
      border-radius: 0.2rem;
    }

    button:focus {
      outline: 2px solid currentColor;
      outline-style: auto;
    }

    /*
    button:hover {
      background: #79b4ff;
      transform: scale(1.2);
    }
    */
  `;

  static get properties() {
    return {
      url:      { type: String },
      title:    { type: String },
      text:     { type: String },
      image:    { type: String },
    };
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
        // console.log(url.toString());
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

      render() {
        return html`
          <button 
            part="share-button"
            class="share" 
            aria-label="Share" 
            title="Share" 
            @click="${this.share}">
            &#xF14D
          </button> 
          <button 
            part="tweet-button"
            class="tweet" 
            aria-label="Share on Twitter"
            title="Share on Twitter"
            @click="${this.tweet}">
            &#xF099
          </button> 
          <button 
            part="copy-link-button"
            class="copy-link" 
            aria-label="Copy link to this article"
            title="Copy link to this article"
            @click="${this.copyLink}">
            &#xF0C1
          </button>
        `;
      }
    }
    customElements.define("share-button", ShareButton);

    export default ShareButton;