// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let srcUrl = `url(data:font/woff2;base64,d09GMgABAAAAAAWkAAoAAAAACbwAAAVbAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAATAqLbIhoCw4AATYCJAMYBCAFgzQHIBt5B8geh+k2TrZlMrmSPoNeHeCm3SUQJIgHaxsq4nNnMHeYOfx72RyfSTp3hYfP2/trN4Io6W468LhIOm/AGWVpQoEGUtu/bwaf/pgPtCrOsN0ARzobUGXidNQgAx3v/OHaGiNpWL+B6S+1OzBIC3y2APDiPk4DPsAFewFAPYf2icFfFQJ/AAensAXU2Fo1gb1vQx/h3sgN8IbqAJCzRcMlAMACAEAkBCDBUx3JChF4oF+93du/a/JRJAJqfyvvI+8try3bQksBeUjKFAkAOcAfgJjAQ/MYcGuZaW0igughGlUjNS6uuLi3D7Cjy3oRAy7bfPSVZptTlxtThIe5ZDQuSdgeO8u0q8Gx1n6cl7aiaFPKlrTZxVxSZbLdK67AAO3RJnq1Piag82uKvOCjA+gXt79oRbPmUo19rZfo3EiEK+IXJy41unV+a1JgqtWwDFLDzGI2l263ufUoxm8Mm7iEJVo3crQnoSWVJ9CG9EGNT+uD2frK+MXxvigXuMCbdKXWAfvlmvsbHre1OdClc2WWKhTivUXvuUYM69AvRjdurnu49sH8Co1XHzS7YL5lQcaqOoeKtiRx6MboivjF4orEpdF+5CM99Ja0FaZ5MfPQKsawzj+/CeiuOi40zWJWJHhSDKYVNJfiM4RYFwxdl2qC2tbiw+U7WQglcKaP2pqmrV6DT+th7AF066yL9eAVS/w6MkDTnCmcKL4IiAhpfQlSjgmYsAVov4dGT5VdlgXpvXaNl1YzzApjOHX5NECytRJcKcsSlqQhq9bnywaHabbWPVx1N7qr2bvuFGNFUYpdmMUErKim0hCamqU9afYVbil1eeLS5NWkxr0zO+ocqrILXOXW40kUBQD1xlqWWjXTa6R3wbZQd14rbQhj68yZc11i+f56/ftTRKPpu5MlVxzjBtQgTRL61K21d+8U3jvIe3Cy82NYkkvyKB7B4xMPiBrVCbJ6yL+uOo/g1yCrJvTDWrWAPRb2Bet7p7FBIeHRDEOgIr9gODF+3BaFrSfAwQMLjFrdpqJt60gC62g6NN6hVSr/V42fpAK4amGf4pEtn6z/X6lM2DFggEb+mR8I7PtOJERJ+RJFI8OdM2BVp+gmTqkDM9soY2OVWEBl4QgLi8irJFRxuRaCR7lLqY5l/5M4C6yVyH/A8xfwPQBAug8dOkyK3188/yEXiUT1ivv2q3p6Rsu6RQDAix7WGDYYbEUJTp69m0cSSx49tPehKLLhuKwhwidfn32TVMusJvn27OkX4ZCsGD2VnHy7zl02dcOG0pi7dV7rkymGheI69Z+oX+fedO+0+NyJnXK7tnlzTRv61qn0xa2qN2d7TRP1GvvII8XiXmffttBkUQJFF76MEhS30GhaFOsjFTn15rdT4fwdlcW0gJXl20qg9LLl1XqBY9bt4ziTuR8KTeY6/7DsPw7nSNYyqtb+dS7l0n3r/+9vMnNwOy6+x+yS0tlOZ+LXY6VQ8thy815gv33rtiw1m/qjwLyM3+noY2F7W/kU3P51o8cSFbvj8o/hcAAAACAgg4Rq55knneXln4QiAgAAbjt22NJ59sjHyFZiGt4BACECoPwFvcQR8SR4lqYBSlDhgol2/FgcZKm6dIDKYlK5GJL6IQAEzhJoh4RZBAD5kViyUamXbILMbTaprmAzb5zN10O+jrJGA9TlMMgwNYzU09CabqAFLFTTEF0N0kObkKElrbfhBsj6aDY9DXHoCxvNKlKoRKZsOXIUhbpiWinASt66HSt7WSM2IJRiA5lywm5TIL2F2IuJYpsztqjvbdR2k2pxcBptiL566wMfXLLuUrC2g+SJi9xgAA==)`;
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