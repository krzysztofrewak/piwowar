new Vue({
	el: "#browser",
	data() {
		return {
			loading: true,
			background: "",
			articles: [],
			authors: [],
			searchPhrase: "",
		}
	},
	computed: {
		filteredArticles() {
			return this.articles
		},
	},
	mounted() {
		fetch("./data/articles.json").then(response => response.json()).then(articles => {
			for(let article of articles) {
				this.articles.push(article)
			}
			this.loading = false
		})
		fetch("./data/authors.json").then(response => response.json()).then(authors => {
			for(let author of authors) {
				this.authors.push(author)
			}
		})
		fetch("./data/colors.json").then(response => response.json()).then(colors => {
			this.background = colors[Math.floor(Math.random() * colors.length)]
		})
	},
	methods: {
		getBackgroundLabel(color) {
			return "background: " + color + " !important;"
		},
	},
})