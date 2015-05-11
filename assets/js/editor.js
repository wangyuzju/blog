/**
 * 编辑博文相关功能
 */
require(['octokat', 'jquery', 'marked', 'Article', 'ace', '_'], function(Octokat, $, marked, Article, ace, _) {

  var accessTokenVerify = {
    // 合法的token, 显示已登录, 显示编辑按钮
    valid: function(){
      var loginBtn = $('#gh-oauth-login');

      var root = loginBtn.parents('ul');
      console.log(root);

      loginBtn.html('Github已登录');

      root.append('<li><a href="#" class="fi-page-edit js-edit-page"> 编辑</a></li>');
      initEvents();
    },
    // 不合法的 token, 清空 localstorage
    invalid: function(){
      localStorage.removeItem('github_access_token');
    }
  };

  var accessToken = localStorage && localStorage.getItem('github_access_token');

  if(!accessToken){
    return console.log('no github access_token found, please login first!');
  }


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



  gh = new Octokat({ token: accessToken });
  repo = gh.repos('wangyuzju', 'blog');


  var GhFile = function(filePath){
    this._filePath = filePath;
  };


  GhFile.prototype.read = function(){
    return repo.contents(this._filePath).read({ref: 'gh-pages'});
  };

  GhFile.prototype.write = function(content, successCb, errCb){
    var self = this;
    require(['base64'], function(Base64){
      repo.contents(self._filePath).fetch({ref: 'gh-pages'}).then(function(info){
        console.log(info);
        var data = {
          message: 'Updating file through blog.hellofe.com [' + new Date() + ']',
          content: Base64.encode(content),
          sha: info.sha, // the blob SHA
          branch: 'gh-pages'
        };

        return repo.contents(self._filePath).add(data).then(successCb, errCb);
      });
    });
  };

  var ghFile = new GhFile(operationPanel.data("page-path"));
  /**
   * branch content 相关
   */
  var article = null;

  ghFile.read().then(function(contents){
    //console.log(contents)
    article = new Article(contents);

    setEditorContent(article.getContent());
    // 只插入正文信息
    renderCompiledHtml();
    accessTokenVerify.valid();
  }, function(){
    //console.log(err);
    accessTokenVerify.invalid();
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

  function initEvents(){
    // 恢复 overflow: auto, 允许滚动
    $(document).on('close', '[data-reveal]', function () {
      $('body').css('overflow', 'auto');
    });

    /**
     * 保存编辑
     */
    editorDashboard.find('.save').on('click', function(){
      var src = article.getArticle();
      ghFile.write(src, function(info){
        if(!info){
          alert('非博客作者无法保存更改!')
        }else{
          console.log(info);
          alert('保存成功: ' + info.commit.sha);
        }
      }, function(err){
        alert('保存失败，请打开控制台查看错误说明');
        console.log(err)
      });
    });

    operationPanel.find('.js-edit-page').on('click', function(){
      enterEditMode();
      return false;
    });

    /**
     * editor 相关
     */
    editor.on("input", function(){
    })
    aceEditor.getSession().on('change', function(e) {
      // e.type, etc
      renderCompiledHtml();
    });
  }

  /**
   * 渲染 markdown 成 html
   */
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
