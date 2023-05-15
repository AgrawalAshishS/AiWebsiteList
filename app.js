$(document).ready(function () {
    var originalData = []; // This will be your original data from JSON file
    var data = []; // This will be your filtered data
    var itemsPerPage = 54;
    var currentPage = 1;

    function renderCards() {
        var template = Handlebars.compile($("#card-template").html());
        $("#cards-container").html(template(data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)));
        $('.tag-badge').click(function() {
            filterByTag($(this).text());
        });
    }

    function filterByTag(tag) {
        data = originalData.filter(function(item) {
            return item.tags.includes(tag);
        });
        renderCards();
        renderPagination();
    }

    function renderPagination() {
        $("#pagination").empty();
        for (var i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            var li = $("<li>").addClass("page-item").append($("<a href='#'>").addClass("page-link").text(i));
            if (i === currentPage) li.addClass("active");
            $("#pagination").append(li);
        }
    }
    function renderTagsCloud() {
        var tags = [];
        originalData.forEach(function (item) {
            item.tags.forEach(function (tag) {
                if (!tags.includes(tag)) tags.push(tag);
            });
        });

        tags.forEach(function (tag) {
            var button = $('<button>')
                .addClass('btn btn-outline-primary mr-2 mb-2')
                .text(tag)
                .click(function() {
                    filterByTag(tag);
                });
            $('#tags-cloud').append(button);
        });
    }

    // Fetch data from JSON file
    $.getJSON("data.json", function(jsonData) {
        originalData = jsonData;
        data = jsonData;
        renderCards();
        renderPagination();
        renderTagsCloud();

        // Search function
        $('#search-input').on('keyup', function() {
            var searchInput = $(this).val().toLowerCase();
            data = originalData.filter(function(item) {
                return item.name.toLowerCase().includes(searchInput) ||
                    item.description.toLowerCase().includes(searchInput);
            });
            renderCards();
            renderPagination();
        });
    });

    // Pagination click
    $(document).on('click', '.page-item', function () {
        currentPage = $(this).index() + 1;
        renderCards();
        renderPagination();

        return false;
    });
});
