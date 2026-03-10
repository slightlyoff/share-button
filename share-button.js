let familyName = "share-button-combined";
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

FONTS: {
// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let srcUrl = `url(data:font/woff2;base64,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)`;

let addFont = true;
try {
  for(let font of document.fonts.keys()) {
    if(font.family === familyName) {
      addFont = false;
      break;
    }
  }
} catch(e) { /* squelch for FF */ }

// Try to avoid extra layouts
if(addFont) {
  try {
    var font = new FontFace(
      familyName,
      srcUrl,
      { style: "normal", weight: "400" }
    );
    await font.load();
    document.fonts.add(font);
  } catch(e) {
    console.error(e);
  }
}

} // End FONTS

class ShareButton extends HTMLElement {

  // static fontUrl = srcUrl;

  static styles = `
    :host {
      --transition-duration: 0.3s;
      --hover-scale: 1.2;
      --color: currentColor;
      --hover-bg-color: rgba(0, 0, 0, 18%);
    }

    :host > button {
      all: unset;

      font-family: "${familyName}";
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