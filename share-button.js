// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let srcUrl = `url(data:font/woff2;base64,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)`;

try {
  var font = new FontFace(
    "share-button-combined",
    srcUrl,
    { style: "normal", weight: "400" }
  );
  await font.load();
  document.fonts.add(font);
} catch(e) {
  console.error(e);
}

// This seems the universal way given the brokenness 
// of FF and Safari WRT to fonts.check() and load()
// let styleEl = document.createElement("style");
// styleEl.innerText = `
//   @font-face {
//     font-family: "share-button-combined";
//     font-display: block;
//     src: ${srcUrl} format("woff2");
//   }
// `;
// document.head.appendChild(styleEl);

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
    _styleMap.set(styles, s);
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


class ShareButton extends HTMLElement {

  static fontUrl = srcUrl;

  static styles = `
    :host {
      --transition-duration: 0.3s;
      --hover-scale: 1.2;
      --color: currentColor;
      --hover-bg-color: rgba(0, 0, 0, 18%);
    }

    :host > button {
      all: unset;

      font-family: share-button-combined;
      color: var(--color);

      display: inline-block;
      padding: 0.5rem 0.75rem;
      border-radius: 0.2rem;
      cursor: pointer;
      will-change: transform;
      transition: all var(--transition-duration, 0.3s);
    }

    :host > button:focus {
      outline: 2px solid currentColor;
      outline-style: auto;
    }

    :host > button:hover {
      background: var(--hover-bg-color);
      transform: scale(var(--hover-scale));
    }
  `;

  static template = (() => {
    // TODO: add an RSS button (icon &#xF09E;)
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
        &#xF099;
      </button>
      <button
        part="toot-button"
        class="toot"
        aria-label="Share on Mastodon"
        title="Share on Mastodon"
        id="toot">
        &#xF4F6;
      </button>
      <button
        part="bsky-button"
        class="skeet"
        aria-label="Share on Bluesky"
        title="Share on Bluesky"
        id="skeet">
        &#xE671;
      </button>
      <button
        part="li-button"
        class="promote"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        id="promote">
        &#xF08C;
      </button>
      <button
        part="copy-link-button"
        class="copy-link"
        aria-label="Copy link to this article"
        title="Copy link to this article"
        id="copy">
        &#xF0C1;
      </button>
      <dialog id="toot-prompt" 
        part="toot-prompt-dialog">
        <form method="dialog" id="toot-form">
          <label for="instance">Instance</label>
          <input
            type="url"
            id="instance"
            placeholder="https://mastodon.social/"
            pattern="https://.*"
            list="defaultURLs"
            required>
            <datalist id="defaultURLs">
              <option value="https://mastodon.social/"></option>
              <option value="https://toot.cafe/"></option>
              <option value="https://hachyderm.io/"></option>
              <option value="https://infosec.exchange/"></option>
              <option value="https://mastodon.art/"></option>
              <option value="https://jouna.host/"></option>
              <option value="https://indieweb.social/"></option>
            </datalist>
          <menu>
            <button id="cancel" type="button">Cancel</button>
            <button type="submit">Toot</button>
          </menu>
        </form>
      </dialog>
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

  #$(selector) {
    return Array.from(this.shadowRoot.querySelectorAll(selector));
  }

  #$$(id) {
    return this.shadowRoot.getElementById(id);
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
    // TODO: event logging for analytics
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

  // Web Share
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

  // *sigh*
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

  // Mastodon
  async toot(evt) {
    let instance = this.#$$("instance").value;
    let url = new URL("/share", instance);
    url.searchParams.set("url", this._url);
    url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "tootShare", "popup,noopener");
    this.#success(evt);
  }

  openTootDialog(evt) { this.#$$("toot-prompt").showModal(); }

  closeTootDialog(evt) { this.#$$("toot-prompt").close(); }

  // LI sharing
  promote(evt) {
    // https://www.linkedin.com/sharing/share-offsite/?url={url}
    let url = new URL("/sharing/share-offsite", "https://www.linkedin.com");
    // LI seems to support posting either URLs, *or* text, so we go w/ URL
    url.searchParams.set("url", this._url);
    // url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "liShare", "popup,noopener");
    this.#success(evt);
  }

  // Bsky
  skeet(evt) {
    // https://bsky.app/intent/compose?text=...
    let url = new URL("/intent/compose", "https://bsky.app");
    url.searchParams.set("text", `${this._fullText} ${this._url}`);
    window.open(url.toString(), "skeetShare", "popup,noopener");
    this.#success(evt);
  }

  connectedCallback() {
    this.wireElements();
  }

  #wired = false;
  wireElements() {
    // Prevent memory leaks
    if (this.#wired) { return; }
    this.#wired = true;

    let sr = this.shadowRoot;
    let listen = (id, evt, method) => {
      let m = (typeof method == "string") ?
          this[method].bind(this) :
          method;
      this.#$$(id).addEventListener(evt, m);
    };

    addStyles(sr, ShareButton.styles);

    sr.appendChild(
      ShareButton.template.content.cloneNode(true)
    );

    if (navigator.share) {
      listen("share", "click", "share");
    } else {
      this.#$$("share").style.display = "none";
    }

    listen("tweet", "click", "tweet");
    listen("toot", "click", "openTootDialog");
    listen("copy", "click", "copyLink");
    listen("toot-form", "submit", "toot");
    listen("cancel", "click", "closeTootDialog");
    listen("promote", "click", "promote");
    listen("skeet", "click", "skeet");
  }
}
customElements.define("share-button", ShareButton);

export default ShareButton;