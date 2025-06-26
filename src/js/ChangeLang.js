const rootSelector = `[data-js-privacy]`

class ChangeLan {

    selectors = {
        root: rootSelector,
        buttonEn: `[data-js-button-english]`,
        buttonJp: `[data-js-button-japanese]`,
    }

    stateClasses = {
        isActive: 'is-active'
    }

    stateAttribute = {
        paragraph: 'data-i18n',
    }

    translations = {
          en: {
                privacy_title: "Privacy Policy",
                privacy_p1: "Your trust is important to us. We collect only minimal data, such as your name and email, when you fill out forms on the website.",
                privacy_p2: "The data is used only for feedback purposes and is not shared with third parties. We may also use cookies to improve the site's functionality and analyze traffic.",
                privacy_p3: "By using this website, you agree to our privacy policy.",
                
                terms_title: "Terms & Conditions",
                terms_p1: "The content published on this website (texts, images, design) belongs to Valley Dinn and is protected by copyright.",
                terms_p2: "Copying or using materials without permission is prohibited. We are not responsible for any errors on the site or for actions taken by users based on its content.",
                terms_p3: "By using this website, you agree to these terms."
            }, 
            ja: {
                privacy_title: "プライバシーポリシー",
                privacy_p1: "私たちは、お客様の信頼を大切にしています。当サイトでは、お名前やメールアドレスなど、フォームに入力された最小限の情報のみを収集します。",
                privacy_p2: "収集した情報は、お問い合わせへの対応のみに使用され、第三者に提供されることはありません。また、サイトの機能向上やアクセス解析のためにクッキーを使用する場合があります。",
                privacy_p3: "本ウェブサイトを利用することで、本ポリシーに同意いただいたものとみなします。",
                
                terms_title: "利用規約",
                terms_p1: "本ウェブサイトに掲載されているコンテンツ（テキスト、画像、デザインなど）は、Valley Dinn に帰属し、著作権により保護されています。",
                terms_p2: "許可なく素材をコピーしたり使用することは禁止されています。当サイト上のエラーや、その内容に基づくユーザーの行動について、当方は責任を負いません。",
                terms_p3: "本ウェブサイトを利用することで、これらの利用条件に同意したものとみなされます。"
            },
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonEnElement = this.rootElement.querySelector(this.selectors.buttonEn)
        this.buttonJpElement = this.rootElement.querySelector(this.selectors.buttonJp)

        this.bindEvents()
    }

    changeLang(lang) {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute(this.stateAttribute.paragraph)
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        })
    }

    onEnClick() {
        this.buttonJpElement.classList.remove(this.stateClasses.isActive)
        this.buttonEnElement.classList.add(this.stateClasses.isActive)

        this.changeLang('en')
    }

    onJpClick() {
        this.buttonEnElement.classList.remove(this.stateClasses.isActive)
        this.buttonJpElement.classList.add(this.stateClasses.isActive)

        this.changeLang('ja')
    }

    bindEvents() {
        this.buttonEnElement.addEventListener('click' , () => this.onEnClick())
        this.buttonJpElement.addEventListener('click', () => this.onJpClick())
    }
}

class ChangeLanCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ChangeLan(element)
        })
}
}

export default ChangeLanCollection