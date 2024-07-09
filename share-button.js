// One-time global addition of fonts to the parent document. This prevents
// repeated definitions as well as the node bloat of SVG.
let srcUrl = `url(data:font/woff2;base64,d09GMgABAAAAAAS4AAoAAAAACAwAAARtAwEDAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAgQwKiASGCQE2AiQDFAsMAAQgBYM0ByAbVgYArgZsFz1DDE2LjrYji3S59I6ITpHHx6VJPPz/WrvvzwwiHjeR8GTaaJuwZlpnKyVwSNS4IYNHfvIve7NExNmYPzBYntrr2LKFDtbV7NkvOcFuUP0mdDZTPPActn9jTFqzgfX8MLtBkAaULcBAoj2sA0wks92/Nm6DuK4acJcFFBiEkvAq2H7+r6mH0Xy3KtGRzgYUkbh3tAocRYINeEL/jdbWGOV7nggDwdm8emmsEVUXHyvI4xNSgILYD0QBW1P8Q0hrMSkymFSX8VbWIX7w+FD5kgP/z0B+AFgCAbEY1WAKIMkE+pC1YB/FAtCiSZLeKx88Or6MAPYz9JicTbZNOBAU2gZf5soxlgUL/P0FluMfB7AM//5HJIaCoQVqRKLa81gThheSTFxc0VFVJYiMMVFj410hwJpXaeqtc9tkW+6M9Nj9lVB1vVaZkb/zmvQsCyz4juWZ9oXuLLGhuamVMd9EVYrKEmri+RmzHdE9lhiVmVRohFepJf09t1GDK82N+CilZ7VVVndbVxpH7ok97AvfkV9QXkChSWRax3E9YByqxuUyI72j3qMtK7/D3hhjslO4Ee5W6+VJyTDWmOk9him5Dfnn7M1mh543xiR7pCMmAk0aulqHURJnXMnlwt4o0xqsDiJV5jF1bq1NyCMvIOYhhXrWnWhJL2rggNS4LpWW3pGb1tlOB/TQTaXSlvqaLhlQBm1MGidx6T5m/oiadkTSbRJ1mwmVZcMEKyclNmWnICl2j0fsrPzc1ljXKmoYf4r0jduo2QOUpqEvFKI4YKvjInJx1nPSS0S+3LcOud5qdkdGXsoW/rNDfA4N5XPyWOGsJ2flOpFF2sivdxsO9vX/3jHHM8Fn0EDh/4ara/gKAO33hyWlXOTX9dU3nchkeuxlZdu/OXWztwSQR+pCGU9OHuDwrxYOdEKotX/iHUPDkb2PDIsZ5x+XnxSLaQfO5+XFOyFtR1mGplh5Nz+QnJycLCl/mN8JRjT+FBC7A+3jfxfvw4NWN9M99IhKYKBEJHt3VvXCW/J9IaogkT7GPZFI6b8PrhxDGl5wSKWdHIQ9TiKIkPl/H6XTvv+lMAr/tQfVGAyCXdMrK7C+Cddx+YxkXL7U1o4qZCOC/Jhbewu3F6RUYFGly3NjXvf6U1P+mYjCBtRleqmz+9azhSkaPyaNWf2stE0/B+JeGtvfxuRzEF4BrlmYnCnCGaEaXRvPjemZrOBe1ewcBckAEGRBhr/NU30w3fSHQCQB1JO7V7Js/f8SLzjI9wCaJKTluydSGUqPy2ABQmURjZDk8kBLjhxGj8iKnKA5LBDoRY2qyCJnAjPAVoQlZoqkw6Uis6m2N89TFE49H6vBTECeiwKFqhTLkiFTKUxLCm2YuwL53u9zUiFNiQJ50mKTMAuYs2JJ8qUSgwVrZiiTK6ne061a1fosGDDea8OlKVYiq2ICs4xrsGLAKGHMcv9SBEvmMK1b+8srDVrDt/i0sY1av8U7temHyZSu/21CAAA=)`;
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