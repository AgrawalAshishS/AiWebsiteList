let websites = []; // Our data will go here


// Load the data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(json => {
      websites = json;
        displayWebsiteCards(websites);
        displayTagCloud();
    });

// Display initial website cards


function displayWebsiteCards(websites) {
  var cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  websites.forEach(function (website) {
      var card = document.createElement('div');
      card.className = 'card';

      var logo = document.createElement('img');
      logo.src = website.logo;
      card.appendChild(logo);

      var name = document.createElement('h2');
      name.textContent = website.name;
      card.appendChild(name);

      var description = document.createElement('p');
      description.textContent = website.description;
      card.appendChild(description);

      var websiteList = document.createElement('ul');
      website.websites.forEach(function (url) {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = url;
          link.textContent = url;
          listItem.appendChild(link);
          websiteList.appendChild(listItem);
      });
      card.appendChild(websiteList);

      cardContainer.appendChild(card);
  });
}

// Add event listener to search input
var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
  var searchQuery = searchInput.value.toLowerCase();
  var filteredWebsites = websites.filter(function (website) {
      return (
          website.name.toLowerCase().includes(searchQuery) ||
          website.description.toLowerCase().includes(searchQuery) ||
          website.tags.some(function (tag) {
              return tag.toLowerCase().includes(searchQuery);
          })
      );
  });
  displayWebsiteCards(filteredWebsites);
});

function displayTagCloud(){

  // Generate tag cloud
  var tagCloud = document.getElementById('tagCloud');
  var tags = websites.reduce(function (allTags, website) {
    return allTags.concat(website.tags);
  }, []);

  console.log(tags);

  var tagCounts = tags.reduce(function (tagCounts, tag) {
    if (tagCounts[tag]) {
        tagCounts[tag]++;
    } else {
        tagCounts[tag] = 1;
    }
    return tagCounts;
  }, {});

  Object.entries(tagCounts).forEach(function ([tag, count]) {
    var tagElement = document.createElement('span');
    tagElement.textContent = tag;
    tagElement.style.fontSize = Math.min(16 + count * 2, 24) + 'px';
    tagElement.addEventListener('click', function () {
        var filteredWebsites = websites.filter(function (website) {
            return website.tags.includes(tag);
        });
        displayWebsiteCards(filteredWebsites);
    });
    tagCloud.appendChild(tagElement);
  });
}