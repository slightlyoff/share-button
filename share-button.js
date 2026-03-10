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
// For inline Lit syntax highlighting
let css = function(strs, subs) {
 if (strs?.length > 1 || subs?.length > 1) {
  console.dir(strs);
  console.dir(subs);
  throw "tag called with values"; 
 }
 return strs[0];
}; 
let html = css;


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

  static styles = css`
:host {
  --transition-duration: 0.3s;
  --hover-scale: 1.2;
  --color: currentColor;
  --hover-bg-color: rgba(0, 0, 0, 18%);
}

button, a {
  :host > & {
    all: unset;

    font-family: "share-button-combined";
    color: var(--color);

    display: inline-block;
    padding: 0.5rem 0.75rem;
    border-radius: 0.2rem;
    cursor: pointer;
    will-change: transform;
    transition: all var(--transition-duration, 0.3s);
  }
}

:host > button:focus, 
:host > a:focus {
  outline: 2px solid currentColor;
  outline-style: auto;
}

:host > button:hover, 
:host > a:hover {
  background: var(--hover-bg-color);
  transform: scale(var(--hover-scale));
}
  `;

  static template = (() => {
    // TODO: add an RSS button (icon &#xF09E;)
    document.body.insertAdjacentHTML("beforeend", html`
<template>
  <button part="share-button"
    class="share"
    aria-label="Share"
    title="Share"
    id="share">
    &#xF14D
  </button>
  <button part="tweet-button"
    class="tweet"
    aria-label="Share on Twitter"
    title="Share on Twitter"
    id="tweet">
    &#xF099;
  </button>
  <button part="toot-button"
    class="toot"
    aria-label="Share on Mastodon"
    title="Share on Mastodon"
    id="toot">
    &#xF4F6;
  </button>
  <button part="bsky-button"
    class="skeet"
    aria-label="Share on Bluesky"
    title="Share on Bluesky"
    id="skeet">
    &#xE671;
  </button>
  <button part="li-button"
    class="promote"
    aria-label="Share on LinkedIn"
    title="Share on LinkedIn"
    id="promote">
    &#xF08C;
  </button>
  <button part="tumblr-button"
    class="tumbl"
    aria-label="Share on Tumblr"
    title="Share on Tumblr"
    id="tumbl">
    &#xF173;
  </button>
  <a part="email-button"
    class="email"
    aria-label="Share in email"
    title="Share in email"
    id="email"
    target="_blank"
    rel="noopener">
    &#x40;
  </a>
  <button part="copy-link-button"
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
</template>
`);
    return document.body.lastElementChild;
  })();

/*
  // TODO:
  <button part="ig-button"
    class="gram"
    aria-label="Share on Instagram"
    title="Share on Instagram"
    id="gram">
    &#xF16D;
  </button>
*/

  static get observedAttributes() {
    return [
      "url",
      "title",
      "text",
      "image",
      "order",
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
      this.#updateEmail();
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

  #open(url, name) {
    window.open(url.toString(), name, "popup,noopener");
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
    this.#open(url, "twitterShare");
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
    this.#open(url, "tootShare");
    this.#success(evt);
  }

  openTootDialog(evt) { this.#$$("toot-prompt").showModal(); }

  closeTootDialog(evt) { this.#$$("toot-prompt").close(); }

  // LI sharing
  async promote(evt) {
    // https://www.linkedin.com/sharing/share-offsite/?url={url}
    let url = new URL("/sharing/share-offsite", "https://www.linkedin.com");
    // LI seems to support posting either URLs, *or* text, so we go w/ URL
    url.searchParams.set("url", this._url);
    // url.searchParams.set("text", this._fullText);
    window.open(url.toString(), "liShare", "popup,noopener");
    this.#success(evt);
  }

  // Bsky
  async skeet(evt) {
    // https://bsky.app/intent/compose?text=...
    let url = new URL("/intent/compose", "https://bsky.app");
    url.searchParams.set("text", `${this._fullText} ${this._url}`);
    this.#open(url, "skeetShare");
    this.#success(evt);
  }

  // IG
  // async gram(evt) {
  //   // TODO
  // }
  
  // Tumblr
  async tumbl(evt) {
    // https://www.tumblr.com/share/link?url=
    let url = new URL("/share/link", "https://www.tumblr.com");
    url.searchParams.set("url", `${this._url}`);
    url.searchParams.set("posttype", "link");
    this.#open(url, "tumblrShare");
    this.#success(evt);
  }

  // Email
  #updateEmail() {
    let url = new URL("mailto:");
    url.searchParams.set("subject", `${this.title}`);
    // TODO: make more configurable
    url.searchParams.set("body", `${this._fullText} ${this._url}`);
    this.#$$("email")?.setAttribute("href", url+"");
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

    listen("toot", "click", "openTootDialog");
    listen("copy", "click", "copyLink");
    listen("toot-form", "submit", "toot");
    listen("cancel", "click", "closeTootDialog");
    ["tweet", "promote", "skeet", /*"gram",*/ "tumbl"].forEach((n) => {
      listen(n, "click", n);
    });
    this.#updateOrder();
  }

  // We count on these all being called infrequently
  #order = [];
  set order(value) { 
    this.#order = value.split(/\s+/).filter(i => !!i);
    this.#updateOrder();
  }
  get order() { return this.#order.join(" "); }

  #updateOrder() {
    if(!this.#wired) { return; }
    let b = this.#$(":host > button, :host > a");
    // Hide/unhide items
    b.forEach((i) => { 
      i.style.display = 
          (!this.#order.length || this.#order.includes(i.id)) ? "" : "none";
    });
    this.shadowRoot.prepend(...(this.#order.map(this.#$$.bind(this))));
  }
}
customElements.define("share-button", ShareButton);

export default ShareButton;