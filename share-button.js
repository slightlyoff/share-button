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
        id="toot">
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
    let instance = this.shadowRoot.getElementById("instance").value;
    console.dir(evt);
    console.dir(this._fullText);
    console.log(instance);
    let url = new URL("/share", instance);
    url.searchParams.set("url", this._url);
    url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "tootShare", "popup,noopener");
    this.#success(evt);
  }

  openTootDialog(evt) {
    let dialog = this.shadowRoot.getElementById("toot-prompt");
    dialog.showModal();
  }

  closeTootDialog(evt) {
    let dialog = this.shadowRoot.getElementById("toot-prompt");
    dialog.close();
  }

  // LI sharing
  promote(evt) {
    // https://www.linkedin.com/sharing/share-offsite/?url={url}
    let url = new URL("/sharing/share-offsite", "https://www.linkedin.com");
    url.searchParams.set("url", this._url);
    url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "liShare", "popup,noopener");
    this.#success(evt);
  }

  // Bsky
  skeet(evt) {

    // https://bsky.app/intent/compose ? text=...
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
    let byId = (id) => { return sr.getElementById(id); }
    let listen = (id, evt, method) => {
      let m = (typeof method == "string") ?
          this[method].bind(this) :
          method;
      byId(id).addEventListener(evt, m);
    };

    addStyles(sr, ShareButton.styles);

    sr.appendChild(
      ShareButton.template.content.cloneNode(true)
    );

    if (navigator.share) {
      byId("share").addEventListener("click",
        this.share.bind(this)
      );
    } else {
      byId("share").style.display = "none";
    }

    listen("tweet", "click", "tweet");
    listen("toot", "click", "openTootDialog");
    listen("copy", "click", "copyLink");
    listen("toot-form", "submit", "toot");
    listen("cancel", "click", "closeTootDialog");
  }
}
customElements.define("share-button", ShareButton);

export default ShareButton;