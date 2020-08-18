const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apikey

function robot(content){
fetchContentFromWikipedia(content)
//sanitizeContent(content)
//breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content){  //async it means the return will be a "promise"
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2') //https://algorithmia.com/algorithms/web/WikipediaParser
        const wikipediaAnswer = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaAnswer.get()
        console.log(wikipediaContent)
    }
}



module.exports = robot 