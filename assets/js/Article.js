/**
 * 根据输入的 jekyll 源文件，抽离出配置相关信息和文章内容
 *
 */
define(['yaml'], function(yaml){

  var _utils = {};

  _utils.trim = function(str){
    return str.replace(/^\s+|\s+$/g, '');
  };
  /**
   * @module
   * @constructor
   */
  var Article = function(mdSrc){
    this.originSrc = mdSrc;
    this.prepareData();

  };

  /**
   * 抽离配置和内容文件
   */
  Article.prototype.prepareData = function(){
    //  尽可能少匹配，避免正文中出现 ---
    var regYamlConf = /---([\w\W]+?)---/;
    var conf = this.originSrc.match(regYamlConf);
    if(conf && conf[1]) {
      try{
        conf = yaml.load(_utils.trim(conf[1]));

        this._conf = conf;
      }catch (e){
        console.error(conf[1]);
        console.error(e);
      }

      this._content = _utils.trim(this.originSrc.replace(regYamlConf, ''));
    }else{
      // 不存在配置文件，整个数据都是正文
      this._content = this.originSrc
    }

    // 自动补全 15 个换行符
    this._content += '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';

    console.log(this);
  };

  Article.prototype.getContent = function(){
    return this._content;
  };

  Article.prototype.setContent = function(content){
    this._content = content;
  };

  Article.prototype.getConf = function(){
    return this._conf;
  };

  /**
   * 将配置信息和正文信息拼装成 jekyll 文章之后返回
   */
  Article.prototype.getArticle = function(){
    var confStr = yaml.dump(this._conf);

    return '---\n' + confStr + '---\n\n' + _utils.trim(this._content) + '\n';
  };

  Article.prototype.tags = function(){
    return this._conf.tags || [];
  };

  Article.prototype.category = function(){
    return this._conf.category;
  };

  return Article

});
