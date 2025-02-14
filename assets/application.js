new Vue({
	el: "#browser",
	data() {
		return {
			loading: true,
			background: "",
			articles: [],
			authors: [],
			sections: [],
			tags: [],
			authorFilter: "",
			sectionFilter: "",
			searchedTitle: "",
			searchedSectionName: "",
			searchedAuthorName: "",
			showMoreAuthors: false,
			showMoreSections: false,
			showMenu: false,
			showAbout: false,
		}
	},
	computed: {
		filteredArticles() {
			let articles = this.articles.filter(article => article.title.toLocaleLowerCase().includes(this.searchedTitle.toLocaleLowerCase()) && article.section.toLocaleLowerCase().includes(this.searchedSectionName.toLocaleLowerCase()))

			if(this.authorFilter) {
				articles = articles.filter(article => article.authors.includes(this.authorFilter))
			}

			return articles
		},
		filteredSections() {
			let sections = this.sections.filter(section => section.name.toLocaleLowerCase().includes(this.searchedSectionName.toLocaleLowerCase()))
			if(!this.showMoreSections) {
				sections = sections.splice(0, 10)
			}
			return sections
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
		showMoreSectionsMenu() {
			return !this.searchedAuthorName
		},
	},
	mounted() {
		fetch("./data/articles.json?" + Date.now()).then(response => response.json()).then(articles => {
			for(let article of articles) {
				this.articles.push(article)
			}
			this.loading = false
		})
		fetch("./data/authors.json?" + Date.now()).then(response => response.json()).then(authors => {
			for(let author of authors) {
				this.authors.push(author)
			}
		})
		fetch("./data/sections.json?" + Date.now()).then(response => response.json()).then(sections => {
			for(let section of sections) {
				this.sections.push(section)
			}
		})
		fetch("./data/colors.json?" + Date.now()).then(response => response.json()).then(colors => {
			this.background = colors[Math.floor(Math.random() * colors.length)]
		})
		fetch("./data/tags.json?" + Date.now()).then(response => response.json()).then(tags => {
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
		filterSection(section) {
			if(this.sectionFilter === section) {
				this.sectionFilter = ""
				this.searchedSectionName = ""
			} else {
				this.sectionFilter = section
				this.searchedSectionName = section
			}
		},
		resetView() {
			this.showMenu = false
			this.showAbout = false
		}
	},
})