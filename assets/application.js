new Vue({
	el: "#browser",
	data() {
		return {
			loading: true,
			background: "",
			articles: [],
			authors: [],
			tags: [],
			authorFilter: "",
			searchedTitle: "",
			searchedSection: "",
			searchedAuthorName: "",
			showMoreAuthors: false,
			showMenu: false,
			showAbout: false,
		}
	},
	computed: {
		filteredArticles() {
			let articles = this.articles.filter(article => article.title.toLocaleLowerCase().includes(this.searchedTitle.toLocaleLowerCase()) && article.section.toLocaleLowerCase().includes(this.searchedSection.toLocaleLowerCase()))

			if(this.authorFilter) {
				articles = articles.filter(article => article.authors.includes(this.authorFilter))
			}

			return articles
		},
		filteredAuthors() {
			let authors = this.authors.filter(article => article.name.toLocaleLowerCase().includes(this.searchedAuthorName.toLocaleLowerCase()))
			if(!this.showMoreAuthors) {
				authors = authors.splice(0, 10)
			}
			return authors
		},
		showMoreAuthorsMenu() {
			return !this.searchedAuthorName
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
		fetch("./data/tags.json").then(response => response.json()).then(tags => {
			for(let tag of tags) {
				this.tags.push(tag)
			}
		})
	},
	methods: {
		getBackgroundLabel(color) {
			return "background: " + color + " !important;"
		},
		filterAuthor(author) {
			if(this.authorFilter === author) {
				this.authorFilter = ""
				this.searchedAuthorName = ""
			} else {
				this.authorFilter = author
				this.searchedAuthorName = author
			}
		},
		resetView() {
			this.showMenu = false
			this.showAbout = false
		}
	},
})