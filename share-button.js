// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let srcUrl = `url(data:font/woff2;base64,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)`;
if (!document.fonts.check("1rem share-button-combined")) {

  var font = new FontFace(
    "share-button-combined",
    srcUrl,
    { style: 'normal', weight: '400' }
  );
  await font.load();
  document.fonts.add(font);
}

let ua = navigator.userAgent;
let styleEl = document.createElement("style");
styleEl.innerText = `
  @font-face {
    font-family: "share-button-combined";
    font-display: block;
    src: ${srcUrl} format("woff2");
  }
`;
document.head.appendChild(styleEl);

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