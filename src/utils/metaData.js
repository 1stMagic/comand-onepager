import axios from "axios"

function loadMetaData(currentLanguage) {
    axios.get("/templates/pages/data/meta-" + currentLanguage + '.json')
        .then(response => writeMetaData(response.data))
        .catch(error => console.error('An error occurred while loading meta' + currentLanguage + '.json', error))
}

function writeMetaData(metaData) {
  for(const metaName in metaData) {
      if(metaName === "title") {
          const titleTag = document.head.querySelector("title")
          titleTag.innerText = metaData.title
      } else {
          const metaTag = document.head.querySelector("meta[name=" + metaName + "]")
          if (metaTag) {
              metaTag.setAttribute("content", Array.isArray(metaData[metaName]) ? metaData[metaName].join(", ") : metaData[metaName])
          } else {
              const element = document.createElement("meta")
              element.setAttribute("name", metaName)
              element.setAttribute("content", Array.isArray(metaData[metaName]) ? metaData[metaName].join(", ") : metaData[metaName])
              document.head.append(element)
          }
      }
  }
}

export {loadMetaData}