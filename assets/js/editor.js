/**
 * 编辑博文相关功能
 */
require(['octokit', 'jquery', 'marked', 'Article', 'ace', '_'], function(Octokit, $, marked, Article, ace, _) {
  console.log(ace);
  // @see [how to use ace]{@link http://ace.c9.io/#nav=howto}
  aceEditor = ace.edit("ace-editor");
  aceEditor.setTheme("ace/theme/monokai");
  aceEditorSession = aceEditor.getSession();
  aceEditorSession.setMode("ace/mode/markdown");
  aceEditorSession.setUseWrapMode(true);


  function setEditorContent(str){
    console.log(str);
    aceEditor.setValue(str);
  }


  var operationPanel = $('#editor-dashboard');
  var editor = $('#editor');
  var editorDashboard = $('#editorDashboard');
  var outputContainer = $('#editor-preview');
  var output = $('#editor-preview-content');

  var gh = new Octokit({
    token: "72cfd87c2e630636ae2f8032bbdf95a1406d4842"
  });


  /**
   * branch content 相关
   */
  var repo = gh.getRepo('wangyuzju', 'blog');
  var branch = repo.getBranch("gh-pages");
  var article = null;
  branch.contents(operationPanel.find(".file-path").text())
    .then(function(contents) {
      //console.log(contents)
      article = new Article(contents);

      setEditorContent(article.getContent());
      // 只插入正文信息
      renderCompiledHtml();
    });


  /**
   * 进入编辑模式，打开编辑面板，
   */
  function enterEditMode(){
    editorDashboard.foundation('reveal','open');

    //@see [how-to-disable-scrolling-temporarily]{@link
    //     http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily}
    $('body').css('overflow', 'hidden');
  }

  // 恢复 overflow: auto, 允许滚动
  $(document).on('close', '[data-reveal]', function () {
    $('body').css('overflow', 'auto');
  });

  /**
   * 保存编辑
   */
  editorDashboard.find('.save').on('click', function(){
    console.log(article.getArticle());
  });

  operationPanel.find('.js-edit-page').on('click', function(){
    enterEditMode();
    return false;
  });
  //var Article = function(src){
  //  this.extractConf()
  //};
  //
  //Article.prototype.extractConf = function(){
  //
  //};

  function renderCompiledHtml() {
    console.log('render...')

    var raw = aceEditor.getValue();
    // 更新文章内容
    article.setContent(raw);

    //console.log(raw);

    var compiled = marked(raw);


    //console.log(compiled);

    output.html(compiled);
  }

  /**
   * editor 相关
   */
  editor.on("input", function(){
  })
  aceEditor.getSession().on('change', function(e) {
    // e.type, etc
    renderCompiledHtml();
  });


  /**
   * track output html with input markdown src
   */
  aceEditorSession.on("changeScrollTop", _.debounce(function (top){
    var viewportFirstRow = aceEditor.getFirstVisibleRow();
    var viewportLastRow = aceEditor.getLastVisibleRow();
    var maxRow = aceEditorSession.getLength();

    var targetRow = viewportFirstRow;
    var tokens = [];

    //return console.log(targetRow, viewportFirstRow, maxRow);
    //do{
    //  var identify = $.trim(tokens[tokens.length - 1]);
    //  console.log(output.find('*:contains("'+ identify + '")'));
    //} while(!tokens.length);

    function isTokenUsable(){
      // 无 token
      if(!tokens.length){ return false }
      //
      var token = tokens[tokens.length - 1];
      // 三个字符以上才可用
      console.log(token);
      return token.value.length > 3;
    }

    tokens = aceEditorSession.getTokens(targetRow);
    while( !isTokenUsable() && targetRow < maxRow ){
      targetRow ++;
      tokens = aceEditorSession.getTokens(targetRow);
    }
    // 空白文件没有内容
    if(!tokens.length){ return; }

    // find matched compiled dom tag
    var token = tokens[tokens.length - 1];
    var identify = $.trim(token.value);
    var matched = output.find('*:contains("'+ identify + '")')[0];

    // do scroll
    if(matched){
      console.log(tokens);
      console.log(matched);
      outputContainer[0].scrollTop = matched.offsetTop - 50 > 0 ?
                        matched.offsetTop - 50 : 0;
    }

  }, 16));
});
