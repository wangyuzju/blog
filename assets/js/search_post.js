/**
 * 初始化搜索文章模块
 */
define(['jquery', '_'], function($, _){

    var searchBox = $('#search-post');

    var posts = [];

    searchBox.on('mouseenter', function _initSearch(){
        if (_initSearch.inited) {return;}
        _initSearch.inited = true;

        // load data
        $.ajax({
            url: '/data/test/',
            dataType: 'json'
        }).then(function(data){
            //console.log(data);
            posts = data.data;
        });
    });

    searchBox.on('input', _.debounce(function(){
        var query = searchBox.val().trim();
        if(!query){
            resetSearchResult();
            return ;
        }

        query = query.toLowerCase();
        var matched = posts.filter(function(item, i){
            return item.character.indexOf(query) != -1;
            //console.log(item);
        });

        renderSearchResult(matched);
    }, 300));


    var tplSearchResult = '<ul>' +
            '<% _.forEach(result, function(item) {  %><li>' +
            '<a href="<%- item.url %>">' +
        '<%- item.title %></a></li><% }); %>' +
        '</ul>';

    var isOpen = false;
    var searchResultPanel = $('#search-result');

    /**
     * 渲染搜索结果列表
     * @param data
     */
    var renderSearchResult = function (data) {
        if(!isOpen){
            searchResultPanel.show()
            isOpen = true;
        }
        searchResultPanel.html(_.template(tplSearchResult, {result: data}));
    };

    /**
     * 重置搜索结果
     */
    var resetSearchResult = function (){
        isOpen = false;
        searchResultPanel.hide();
    };
});
