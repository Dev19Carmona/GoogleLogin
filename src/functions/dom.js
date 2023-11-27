const nodeListToInnerTextArray = (nodeList) => {
    var arrayFromNodeList = Array.from(nodeList);
      var result = [];
      arrayFromNodeList.forEach(function (element) {
        result.push(element.innerText);
      });
      return result
  }
  
  module.exports = {
    nodeListToInnerTextArray
  }