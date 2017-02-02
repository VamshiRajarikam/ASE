// (C)2015 Douglas Crockford
// www.JSLint.com
// jslint.js+adsafe.js+report.js

var jslint=(function JSLint(){"use strict";function empty(){return Object.create(null);}
function populate(object,array,value){array.forEach(function(name){object[name]=value;});}
var allowed_option={bitwise:true,browser:["Audio","clearInterval","clearTimeout","document","event","FileReader","FormData","history","Image","localStorage","location","name","navigator","Option","screen","sessionStorage","setInterval","setTimeout","Storage","XMLHttpRequest"],couch:["emit","getRow","isArray","log","provides","registerType","require","send","start","sum","toJSON"],devel:["alert","confirm","console","prompt"],es6:["ArrayBuffer","DataView","Float32Array","Float64Array","Generator","GeneratorFunction","Int8Array","Int16Array","Int32Array","Intl","Map","Promise","Proxy","Reflect","Set","Symbol","System","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","WeakSet"],eval:true,for:true,fudge:true,maxerr:10000,maxlen:10000,multivar:true,node:["Buffer","clearImmediate","clearInterval","clearTimeout","console","exports","global","module","process","querystring","require","setImmediate","setInterval","setTimeout","__dirname","__filename"],single:true,this:true,white:true};var spaceop={"!=":true,"!==":true,"%":true,"%=":true,"&":true,"&=":true,"&&":true,"*":true,"*=":true,"+=":true,"-=":true,"/":true,"/=":true,"<":true,"<=":true,"<<":true,"<<=":true,"=":true,"==":true,"===":true,"=>":true,">":true,">=":true,">>":true,">>=":true,">>>":true,">>>=":true,"^":true,"^=":true,"|":true,"|=":true,"||":true};var bitwiseop={"~":true,"^":true,"^=":true,"&":true,"&=":true,"|":true,"|=":true,"<<":true,"<<=":true,">>":true,">>=":true,">>>":true,">>>=":true};var opener={"(":")","[":"]","{":"}","${":"}"};var relationop={"!=":true,"!==":true,"==":true,"===":true,"<":true,"<=":true,">":true,">=":true};var standard=["Array","Boolean","Date","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","Error","EvalError","isFinite","JSON","Math","Number","Object","parseInt","parseFloat","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError"];var bundle={and:"The '&&' subexpression should be wrapped in parens.",bad_assignment_a:"Bad assignment to '{a}'.",bad_directive_a:"Bad directive '{a}'.",bad_get:"A get function takes no parameters.",bad_module_name_a:"Bad module name '{a}'.",bad_option_a:"Bad option '{a}'.",bad_property_a:"Bad property name '{a}'.",bad_set:"A set function takes one parameter.",duplicate_a:"Duplicate '{a}'.",empty_block:"Empty block.",es6:"Unexpected ES6 feature '{a}'.",escape_mega:"Unexpected escapement in mega literal.",expected_a:"Expected '{a}'.",expected_a_at_b_c:"Expected '{a}' at column {b}, not column {c}.",expected_a_b:"Expected '{a}' and instead saw '{b}'.",expected_a_b_from_c_d:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",expected_a_before_b:"Expected '{a}' before '{b}'.",expected_digits_after_a:"Expected digits after '{a}'.",expected_four_digits:"Expected four digits after '\\u'.",expected_identifier_a:"Expected an identifier and instead saw '{a}'.",expected_line_break_a_b:"Expected a line break between '{a}' and '{b}'.",expected_regexp_factor_a:"Expected a regexp factor and instead saw '{a}'.",expected_space_a_b:"Expected one space between '{a}' and '{b}'.",expected_statements_a:"Expected statements before '{a}'.",expected_string_a:"Expected a string and instead saw '{a}'.",expected_type_string_a:"Expected a type string and instead saw '{a}'.",function_in_loop:"Don't make functions within a loop.",infix_in:"Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead.",isNaN:"Use the isNaN function to compare with NaN.",label_a:"'{a}' is a statement label.",misplaced_a:"Place '{a}' at the outermost level.",misplaced_directive_a:"Place the '/*{a}*/' directive before the first statement.",missing_browser:"/*global*/ requires the Assume a browser option.",missing_m:"Expected 'm' flag on a multiline regular expression.",naked_block:"Naked block.",nested_comment:"Nested comment.",not_label_a:"'{a}' is not a label.",number_isNaN:"Use Number.isNaN function to compare with NaN.",out_of_scope_a:"'{a}' is out of scope.",redefinition_a_b:"Redefinition of '{a}' from line {b}.",reserved_a:"Reserved name '{a}'.",subscript_a:"['{a}'] is better written in dot notation.",todo_comment:"Unexpected TODO comment.",too_long:"Line too long.",too_many:"Too many warnings.",too_many_digits:"Too many digits.",unclosed_comment:"Unclosed comment.",unclosed_mega:"Unclosed mega literal.",unclosed_string:"Unclosed string.",undeclared_a:"Undeclared '{a}'.",unexpected_a:"Unexpected '{a}'.",unexpected_a_after_b:"Unexpected '{a}' after '{b}'.",unexpected_a_before_b:"Unexpected '{a}' before '{b}'.",unexpected_at_top_level_a:"Expected '{a}' to be in a function.",unexpected_char_a:"Unexpected character '{a}'.",unexpected_comment:"Unexpected comment.",unexpected_directive_a:"When using modules, don't use directive '/*{a}'.",unexpected_expression_a:"Unexpected expression '{a}' in statement position.",unexpected_label_a:"Unexpected label '{a}'.",unexpected_parens:"Don't wrap function literals in parens.",unexpected_space_a_b:"Unexpected space between '{a}' and '{b}'.",unexpected_statement_a:"Unexpected statement '{a}' in expression position.",unexpected_trailing_space:"Unexpected trailing space.",unexpected_typeof_a:"Unexpected 'typeof'. Use '===' to compare directly with {a}.",uninitialized_a:"Uninitialized '{a}'.",unreachable_a:"Unreachable '{a}'.",unregistered_property_a:"Unregistered property name '{a}'.",unsafe:"Unsafe character '{a}'.",unused_a:"Unused '{a}'.",use_double:"Use double quotes, not single quotes.",use_spaces:"Use spaces, not tabs.",use_strict:"This function needs a \"use strict\" pragma.",var_loop:"Don't declare variables in a loop.",var_switch:"Don't declare variables in a switch.",weird_condition_a:"Weird condition '{a}'.",weird_expression_a:"Weird expression '{a}'.",weird_loop:"Weird loop.",weird_relation_a:"Weird relation '{a}'.",wrap_assignment:"Don't wrap assignment statements in parens.",wrap_condition:"Wrap the condition in parens.",wrap_immediate:"Wrap an immediate function invocation in "+"parentheses to assist the reader in understanding that the "+"expression is the result of a function, and not the "+"function itself.",wrap_parameter:"Wrap the parameter in parens.",wrap_regexp:"Wrap this regexp in parens to avoid confusion.",wrap_unary:"Wrap the unary expression in parens."};var rx_supplant=/\{([^{}]*)\}/g;var rx_crlf=/\n|\r\n?/;var rx_unsafe=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;var rx_identifier=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/;var rx_module=/^[a-zA-Z0-9_$:.@\-\/]+$/;var rx_bad_property=/^_|\$|Sync\$|_$/;var rx_star_slash=/\*\//;var rx_slash_star=/\/\*/;var rx_slash_star_or_slash=/\/\*|\/$/;var rx_todo=/\b(?:todo|TO\s?DO|HACK)\b/;var rx_tab=/\t/g;var rx_directive=/^(jslint|property|global)\s+(.*)$/;var rx_directive_part=/^([a-zA-Z$_][a-zA-Z0-9$_]*)\s*(?::\s*(true|false|[0-9]+)\s*)?(?:,\s*)?(.*)$/;var rx_token=/^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\]?,:;'"~`]|=(?:==?|>)?|\.+|\/[=*\/]?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<<?=?|!={0,2}|(0|[1-9][0-9]*))(.*)$/;var rx_digits=/^([0-9]+)(.*)$/;var rx_hexs=/^([0-9a-fA-F]+)(.*)$/;var rx_octals=/^([0-7]+)(.*)$/;var rx_bits=/^([01]+)(.*)$/;var rx_mega=/[`\\]|\$\{/;var rx_colons=/^(.*)\?([:.]*)$/;var rx_dot=/\.$/;var rx_JSON_number=/^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i;var rx_cap=/^[A-Z]/;function is_letter(string){return(string>="a"&&string<="z\uffff")||(string>="A"&&string<="Z\uffff");}
function supplant(string,object){return string.replace(rx_supplant,function(found,filling){var replacement=object[filling];return(replacement!==undefined)?replacement:found;});}
var anon="anonymous";var blockage;var block_stack;var declared_globals;var directives;var directive_mode;var early_stop;var exports;var froms;var fudge;var functionage;var functions;var global;var json_mode;var lines;var module_mode;var next_token;var option;var property;var mega_mode;var stack;var syntax;var token;var token_nr;var tokens;var tenure;var tree;var var_mode;var warnings;function artifact(the_token){if(the_token===undefined){the_token=next_token;}
return(the_token.id==="(string)"||the_token.id==="(number)")?String(the_token.value):the_token.id;}
function artifact_line(the_token){if(the_token===undefined){the_token=next_token;}
return the_token.line+fudge;}
function artifact_column(the_token){if(the_token===undefined){the_token=next_token;}
return the_token.from+fudge;}
function warn_at(code,line,column,a,b,c,d){var warning={name:"JSLintError",column:column,line:line,code:code};if(a!==undefined){warning.a=a;}
if(b!==undefined){warning.b=b;}
if(c!==undefined){warning.c=c;}
if(d!==undefined){warning.d=d;}
warning.message=supplant(bundle[code]||code,warning);warnings.push(warning);return(typeof option.maxerr==="number"&&warnings.length===option.maxerr)?stop_at("too_many",line,column):warning;}
function stop_at(code,line,column,a,b,c,d){throw warn_at(code,line,column,a,b,c,d);}
function warn(code,the_token,a,b,c,d){if(the_token===undefined){the_token=next_token;}
if(the_token.warning===undefined){the_token.warning=warn_at(code,the_token.line,the_token.from,a||artifact(the_token),b,c,d);return the_token.warning;}}
function stop(code,the_token,a,b,c,d){if(the_token===undefined){the_token=next_token;}
delete the_token.warning;throw warn(code,the_token,a,b,c,d);}
function tokenize(source){lines=(Array.isArray(source))?source:source.split(rx_crlf);tokens=[];var char;var column=0;var first;var from;var line=-1;var nr=0;var previous=global;var prior=global;var mega_from;var mega_line;var snippet;var source_line;function next_line(){var at;column=0;line+=1;source_line=lines[line];if(source_line!==undefined){at=source_line.search(rx_tab);if(at>=0){if(!option.white){warn_at("use_spaces",line,at+1);}
source_line=source_line.replace(rx_tab," ");}
at=source_line.search(rx_unsafe);if(at>=0){warn_at("unsafe",line,column+at,"U+"+source_line.charCodeAt(at).toString(16));}
if(option.maxlen&&option.maxlen<source_line.length){warn_at("too_long",line,source_line.length);}else if(!option.white&&source_line.slice(-1)===" "){warn_at("unexpected_trailing_space",line,source_line.length-1);}}
return source_line;}
function snip(){snippet=snippet.slice(0,-1);}
function next_char(match){if(match!==undefined&&char!==match){return stop_at((char==="")?"expected_a":"expected_a_b",line,column-1,match,char);}
if(source_line){char=source_line.charAt(0);source_line=source_line.slice(1);snippet+=char;}else{char="";snippet+=" ";}
column+=1;return char;}
function back_char(){if(snippet){char=snippet.slice(-1);source_line=char+source_line;column-=1;snip();}else{char="";}
return char;}
function some_digits(rx,quiet){var result=source_line.match(rx);if(result){char=result[1];column+=char.length;source_line=result[2];snippet+=char;}else{char="";if(!quiet){warn_at("expected_digits_after_a",line,column,snippet);}}
return char.length;}
function escape(extra){switch(next_char("\\")){case"\\":case"/":case"b":case"f":case"n":case"r":case"t":break;case"u":if(next_char("u")==="{"){if(json_mode){warn_at("unexpected_a",line,column-1,char);}
if(some_digits(rx_hexs)>5){warn_at("too_many_digits",line,column-1);}
if(!option.es6){warn_at("es6",line,column,"u{");}
if(next_char()!=="}"){stop_at("expected_a_before_b",line,column,"}",char);}
next_char();return;}
back_char();if(some_digits(rx_hexs,true)<4){warn_at("expected_four_digits",line,column-1);}
break;case"":return stop_at("unclosed_string",line,column);default:if(!extra||extra.indexOf(char)<0){warn_at("unexpected_a_before_b",line,column-2,"\\",char);}}
next_char();}
function make(id,value,identifier){var the_token={from:from,id:id,identifier:!!identifier,line:line,nr:nr,thru:column};tokens[nr]=the_token;nr+=1;if(id!=="(comment)"&&id!==";"){directive_mode=false;}
if(value!==undefined){the_token.value=value;}
if(previous.line===line&&previous.thru===from&&((id==="(comment)"||id==="(regexp)"||id==="/")&&(previous.id==="(comment)"||previous.id==="(regexp)"))){warn("expected_space_a_b",the_token,artifact(previous),artifact(the_token));}
if(previous.id==="."&&id==="(number)"){warn("expected_a_before_b",previous,"0",".");}
if(prior.id==="."&&the_token.identifier){the_token.dot=true;}
previous=the_token;if(previous.id!=="(comment)"){prior=previous;}
return the_token;}
function parse_directive(the_comment,body){var result=body.match(rx_directive_part);if(result){var allowed;var name=result[1];var value=result[2];switch(the_comment.directive){case"jslint":allowed=allowed_option[name];switch(typeof allowed){case"boolean":case"object":switch(value){case"true":case"":case undefined:option[name]=true;if(Array.isArray(allowed)){populate(declared_globals,allowed,false);}
break;case"false":option[name]=false;break;default:warn("bad_option_a",the_comment,name+":"+value);}
break;case"number":if(isFinite(+value)){option[name]=+value;}else{warn("bad_option_a",the_comment,name+":"+value);}
break;default:warn("bad_option_a",the_comment,name);}
break;case"property":if(tenure===undefined){tenure=empty();}
tenure[name]=true;break;case"global":if(value){warn("bad_option_a",the_comment,name+":"+value);}
declared_globals[name]=false;module_mode=the_comment;break;}
return parse_directive(the_comment,result[3]);}
if(body){return stop("bad_directive_a",the_comment,body);}}
function comment(snippet){var the_comment=make("(comment)",snippet);if(Array.isArray(snippet)){snippet=snippet.join(" ");}
if(!option.devel&&rx_todo.test(snippet)){warn("todo_comment",the_comment);}
var result=snippet.match(rx_directive);if(result){if(!directive_mode){warn_at("misplaced_directive_a",line,from,result[1]);}else{the_comment.directive=result[1];parse_directive(the_comment,result[2]);}
directives.push(the_comment);}
return the_comment;}
function regexp(){var multi_mode=false;var result;var value;function quantifier(){switch(char){case"?":case"*":case"+":next_char();break;case"{":if(some_digits(rx_digits,true)===0){warn_at("expected_a",line,column,"0");}
if(next_char()===","){some_digits(rx_digits,true);next_char();}
next_char("}");break;default:return;}
if(char==="?"){next_char("?");}}
function subklass(){switch(char){case"\\":escape("BbDdSsWw-[]^");return true;case"[":case"]":case"/":case"^":case"-":case"":return false;case"`":if(mega_mode){warn_at("unexpected_a",line,column,"`");}
next_char();return true;case" ":warn_at("expected_a_before_b",line,column,"\\"," ");next_char();return true;default:next_char();return true;}}
function ranges(){if(subklass()){if(char==="-"){next_char("-");if(!subklass()){return stop_at("unexpected_a",line,column-1,"-");}}
return ranges();}}
function klass(){next_char("[");if(char==="^"){next_char("^");}
(function classy(){ranges();if(char!=="]"&&char!==""){warn_at("expected_a_before_b",line,column,"\\",char);next_char();return classy();}}());next_char("]");}
function choice(){function group(){next_char("(");if(char==="?"){next_char("?");switch(char){case":":case"=":case"!":next_char();break;default:next_char(":");}}else if(char===":"){warn_at("expected_a_before_b",line,column,"?",":");}
choice();next_char(")");}
function factor(){switch(char){case"[":klass();return true;case"\\":escape("BbDdSsWw^${}[]():=!.-|*+?");return true;case"(":group();return true;case"/":case"|":case"]":case")":case"}":case"{":case"?":case"+":case"*":case"":return false;case"`":if(mega_mode){warn_at("unexpected_a",line,column-1,"`");}
break;case" ":warn_at("expected_a_b",line,column-1,"\\s"," ");break;case"$":if(source_line.charAt(0)!=="/"){multi_mode=true;}
break;case"^":if(snippet!=="^"){multi_mode=true;}
break;}
next_char();return true;}
function sequence(follow){if(factor()){quantifier();return sequence(true);}
if(!follow){warn_at("expected_regexp_factor_a",line,column,char);}}
sequence();if(char==="|"){next_char("|");return choice();}}
snippet="";next_char();if(char==="="){warn_at("expected_a_before_b",line,column,"\\","=");}
choice();snip();value=snippet;next_char("/");var allowed={g:true,i:true,m:true,u:6,y:6};var flag=empty();(function make_flag(){if(is_letter(char)){switch(allowed[char]){case true:break;case 6:if(!option.es6){warn_at("es6",line,column,char);}
break;default:warn_at("unexpected_a",line,column,char);}
allowed[char]=false;flag[char]=true;next_char();return make_flag();}}());back_char();if(char==="/"||char==="*"){return stop_at("unexpected_a",line,from,char);}
result=make("(regexp)",char);result.flag=flag;result.value=value;if(multi_mode&&!flag.m){warn_at("missing_m",line,column);}
return result;}
function string(quote){var the_token;snippet="";next_char();return(function next(){switch(char){case quote:snip();the_token=make("(string)",snippet);the_token.quote=quote;return the_token;case"\\":escape(quote);break;case"":return stop_at("unclosed_string",line,column);case"`":if(mega_mode){warn_at("unexpected_a",line,column,"`");}
next_char("`");break;default:next_char();}
return next();}());}
function frack(){if(char==="."){some_digits(rx_digits);next_char();}
if(char==="E"||char==="e"){next_char();if(char!=="+"&&char!=="-"){back_char();}
some_digits(rx_digits);next_char();}}
function number(){if(snippet==="0"){switch(next_char()){case".":frack();break;case"b":some_digits(rx_bits);next_char();break;case"o":some_digits(rx_octals);next_char();break;case"x":some_digits(rx_hexs);next_char();break;}}else{next_char();frack();}
if((char>="0"&&char<="9")||(char>="a"&&char<="z")||(char>="A"&&char<="Z")){return stop_at("unexpected_a_after_b",line,column-1,snippet.slice(-1),snippet.slice(0,-1));}
back_char();return make("(number)",snippet);}
function lex(){var array;var i=0;var j=0;var last;var result;var the_token;if(!source_line){source_line=next_line();from=0;return(source_line===undefined)?(mega_mode)?stop_at("unclosed_mega",mega_line,mega_from):make("(end)"):lex();}
from=column;result=source_line.match(rx_token);if(!result){return stop_at("unexpected_char_a",line,column,source_line.charAt(0));}
snippet=result[1];column+=snippet.length;source_line=result[5];if(result[2]){return lex();}
if(result[3]){return make(snippet,undefined,true);}
if(result[4]){return number(snippet);}
switch(snippet){case"\"":return string(snippet);case"'":if(!option.single){warn_at("use_double",line,column);}
return string(snippet);case"`":if(mega_mode){return stop_at("expected_a_b",line,column,"}","`");}
snippet="";mega_from=from;mega_line=line;mega_mode=true;make("`");from+=1;(function part(){var at=source_line.search(rx_mega);if(at<0){snippet+=source_line+"\n";return(next_line()===undefined)?stop_at("unclosed_mega",mega_line,mega_from):part();}
snippet+=source_line.slice(0,at);column+=at;source_line=source_line.slice(at);if(source_line.charAt(0)==="\\"){stop_at("escape_mega",line,at);}
make("(string)",snippet).quote="`";snippet="";if(source_line.charAt(0)==="$"){column+=2;make("${");source_line=source_line.slice(2);(function expr(){var id=lex().id;if(id==="{"){return stop_at("expected_a_b",line,column,"}","{");}
if(id!=="}"){return expr();}}());return part();}}());source_line=source_line.slice(1);column+=1;mega_mode=false;return make("`");case"//":snippet=source_line;source_line="";the_token=comment(snippet);if(mega_mode){warn("unexpected_comment",the_token,"`");}
return the_token;case"/*":array=[];if(source_line.charAt(0)==="/"){warn_at("unexpected_a",line,column+i,"/");}
(function next(){if(source_line>""){i=source_line.search(rx_star_slash);if(i>=0){return;}
j=source_line.search(rx_slash_star);if(j>=0){warn_at("nested_comment",line,column+j);}}
array.push(source_line);source_line=next_line();if(source_line===undefined){return stop_at("unclosed_comment",line,column);}
return next();}());snippet=source_line.slice(0,i);j=snippet.search(rx_slash_star_or_slash);if(j>=0){warn_at("nested_comment",line,column+j);}
array.push(snippet);column+=i+2;source_line=source_line.slice(i+2);return comment(array);case"/":if(prior.identifier){if(!prior.dot){switch(prior.id){case"return":return regexp();case"(begin)":case"case":case"delete":case"in":case"instanceof":case"new":case"typeof":case"void":case"yield":the_token=regexp();return stop("unexpected_a",the_token);}}}else{last=prior.id.charAt(prior.id.length-1);if("(,=:?[".indexOf(last)>=0){return regexp();}
if("!&|{};~+-*%/^<>".indexOf(last)>=0){the_token=regexp();warn("wrap_regexp",the_token);return the_token;}}
if(source_line.charAt(0)==="/"){column+=1;source_line=source_line.slice(1);snippet="/=";warn_at("unexpected_a",line,column,"/=");}
break;}
return make(snippet);}
first=lex();json_mode=first.id==="{"||first.id==="[";while(true){if(lex().id==="(end)"){break;}}}
function survey(name){var id=name.id;if(id==="(string)"){id=name.value;if(!rx_identifier.test(id)){return id;}}else if(id==="`"){if(name.value.length===1){id=name.value[0].value;if(!rx_identifier.test(id)){return id;}}}else if(!name.identifier){return stop("expected_identifier_a",name);}
if(typeof property[id]==="number"){property[id]+=1;}else{if(tenure!==undefined){if(tenure[id]!==true){warn("unregistered_property_a",name);}}else{if(name.identifier&&rx_bad_property.test(id)){warn("bad_property_a",name);}}
property[id]=1;}
return id;}
function dispense(){var cadet=tokens[token_nr];token_nr+=1;if(cadet.id==="(comment)"){if(json_mode){warn("unexpected_a",cadet);}
return dispense();}else{return cadet;}}
function lookahead(){var old_token_nr=token_nr;var cadet=dispense(true);token_nr=old_token_nr;return cadet;}
function advance(id,match){if(token.identifier&&token.id!=="function"){anon=token.id;}else if(token.id==="(string)"&&rx_identifier.test(token.value)){anon=token.value;}
if(id!==undefined&&next_token.id!==id){return(match===undefined)?stop("expected_a_b",next_token,id,artifact()):stop("expected_a_b_from_c_d",next_token,id,artifact(match),artifact_line(match),artifact(next_token));}
token=next_token;next_token=dispense();if(next_token.id==="(end)"){token_nr-=1;}}
function json_value(){var negative;function json_object(){var brace=next_token;var object=empty();var properties=[];brace.expression=properties;advance("{");if(next_token.id!=="}"){(function next(){var name;var value;if(next_token.quote!=="\""){warn("unexpected_a",next_token,next_token.quote);}
name=next_token;advance("(string)");if(object[token.value]!==undefined){warn("duplicate_a",token);}else if(token.value==="__proto__"){warn("bad_property_a",token);}else{object[token.value]=token;}
advance(":");value=json_value();value.label=name;properties.push(value);if(next_token.id===","){advance(",");return next();}}());}
advance("}",brace);return brace;}
function json_array(){var bracket=next_token;var elements=[];bracket.expression=elements;advance("[");if(next_token.id!=="]"){(function next(){elements.push(json_value());if(next_token.id===","){advance(",");return next();}}());}
advance("]",bracket);return bracket;}
switch(next_token.id){case"{":return json_object();case"[":return json_array();case"true":case"false":case"null":advance();return token;case"(number)":if(!rx_JSON_number.test(next_token.value)){warn("unexpected_a");}
advance();return token;case"(string)":if(next_token.quote!=="\""){warn("unexpected_a",next_token,next_token.quote);}
advance();return token;case"-":negative=next_token;negative.arity="unary";advance("-");advance("(number)");negative.expression=token;return negative;default:stop("unexpected_a");}}
function enroll(name,role,readonly){var id=name.id;if(syntax[id]!==undefined&&id!=="ignore"){warn("reserved_a",name);}else{var earlier=functionage.context[id];if(earlier){warn("redefinition_a_b",name,name.id,earlier.line+fudge);}else{stack.forEach(function(value){var item=value.context[id];if(item!==undefined){earlier=item;}});if(earlier){if(id==="ignore"){if(earlier.role==="variable"){warn("unexpected_a",name);}}else{if((role!=="exception"||earlier.role!=="exception")&&role!=="parameter"){warn("redefinition_a_b",name,name.id,earlier.line+fudge);}}}
functionage.context[id]=name;name.dead=true;name.function=functionage;name.init=false;name.role=role;name.used=0;name.writable=!readonly;}}}
function expression(rbp,initial){var left;var the_symbol;if(!initial){advance();}
the_symbol=syntax[token.id];if(the_symbol!==undefined&&the_symbol.nud!==undefined){left=the_symbol.nud();}else if(token.identifier){left=token;left.arity="variable";}else{return stop("unexpected_a",token);}
(function right(){the_symbol=syntax[next_token.id];if(the_symbol!==undefined&&the_symbol.led!==undefined&&rbp<the_symbol.lbp){advance();left=the_symbol.led(left);return right();}}());return left;}
function condition(){var the_paren=next_token;var the_value;the_paren.free=true;advance("(");the_value=expression(0);advance(")");if(the_value.wrapped===true){warn("unexpected_a",the_paren);}
switch(the_value.id){case"?":case"~":case"&":case"|":case"^":case"<<":case">>":case">>>":case"+":case"-":case"*":case"/":case"%":case"typeof":case"(number)":case"(string)":warn("unexpected_a",the_value);break;}
return the_value;}
function is_weird(thing){return(thing.id==="(regexp)"||thing.id==="{"||thing.id==="=>"||thing.id==="function"||(thing.id==="["&&thing.arity==="unary"));}
function are_similar(a,b){if(a===b){return true;}
if(Array.isArray(a)){return(Array.isArray(b)&&a.length===b.length&&a.every(function(value,index){return are_similar(value,b[index]);}));}
if(Array.isArray(b)){return false;}
if(a.id==="(number)"&&b.id==="(number)"){return a.value===b.value;}
var a_string;var b_string;if(a.id==="(string)"){a_string=a.value;}else if(a.id==="`"&&a.constant){a_string=a.value[0];}
if(b.id==="(string)"){b_string=b.value;}else if(b.id==="`"&&b.constant){b_string=b.value[0];}
if(typeof a_string==="string"){return a_string===b_string;}
if(is_weird(a)||is_weird(b)){return false;}
if(a.arity===b.arity&&a.id===b.id){if(a.id==="."){return are_similar(a.expression,b.expression)&&are_similar(a.name,b.name);}
switch(a.arity){case"unary":return are_similar(a.expression,b.expression);case"binary":return(a.id!=="("&&are_similar(a.expression[0],b.expression[0])&&are_similar(a.expression[1],b.expression[1]));case"ternary":return(are_similar(a.expression[0],b.expression[0])&&are_similar(a.expression[1],b.expression[1])&&are_similar(a.expression[2],b.expression[2]));case"function":case"regexp":return false;default:return true;}}
return false;}
function semicolon(){if(next_token.id===";"){advance(";");}else{warn_at("expected_a_b",token.line,token.thru,";",artifact(next_token));}
anon="anonymous";}
function statement(){var first;var the_label;var the_statement;var the_symbol;advance();if(token.identifier&&next_token.id===":"){the_label=token;if(the_label.id==="ignore"){warn("unexpected_a",the_label);}
advance(":");switch(next_token.id){case"do":case"for":case"switch":case"while":enroll(the_label,"label",true);the_label.init=true;the_label.dead=false;the_statement=statement();the_statement.label=the_label;the_statement.statement=true;return the_statement;default:advance();warn("unexpected_label_a",the_label);}}
first=token;first.statement=true;the_symbol=syntax[first.id];if(the_symbol!==undefined&&the_symbol.fud!==undefined){the_symbol.disrupt=false;the_symbol.statement=true;the_statement=the_symbol.fud();}else{the_statement=expression(0,true);if(the_statement.wrapped&&the_statement.id!=="("){warn("unexpected_a",first);}
semicolon();}
if(the_label!==undefined){the_label.dead=true;}
return the_statement;}
function statements(){var array=[];(function next(disrupt){var a_statement;switch(next_token.id){case"}":case"case":case"default":case"else":case"(end)":break;default:a_statement=statement();array.push(a_statement);if(disrupt){warn("unreachable_a",a_statement);}
return next(a_statement.disrupt);}}(false));return array;}
function not_top_level(thing){if(functionage===global){warn("unexpected_at_top_level_a",thing);}}
function top_level_only(the_thing){if(blockage!==global){warn("misplaced_a",the_thing);}}
function block(special){var stmts;var the_block;if(special!=="naked"){advance("{");}
the_block=token;the_block.arity="statement";the_block.body=special==="body";if(special==="body"&&stack.length===1&&next_token.value==="use strict"){the_block.strict=next_token;next_token.statement=true;advance("(string)");advance(";");}
stmts=statements();the_block.block=stmts;if(stmts.length===0){if(!option.devel&&special!=="ignore"){warn("empty_block",the_block);}
the_block.disrupt=false;}else{the_block.disrupt=stmts[stmts.length-1].disrupt;}
advance("}");return the_block;}
function mutation_check(the_thing){if(the_thing.id!=="."&&the_thing.arity!=="variable"&&(the_thing.id!=="["||the_thing.arity!=="binary")){warn("bad_assignment_a",the_thing);return false;}
return true;}
function left_check(left,right){var id=left.id;if(!left.identifier&&(left.arity!=="binary"||(id!=="."&&id!=="("&&id!=="["))){warn("unexpected_a",right);return false;}
return true;}
function symbol(id,bp){var the_symbol=syntax[id];if(the_symbol===undefined){the_symbol=empty();the_symbol.id=id;the_symbol.lbp=bp||0;syntax[id]=the_symbol;}
return the_symbol;}
function assignment(id){var the_symbol=symbol(id,20);the_symbol.led=function(left){var the_token=token;var right;the_token.arity="assignment";right=expression(20-1);if(id==="="&&left.arity==="variable"){the_token.names=left;the_token.expression=right;}else{the_token.expression=[left,right];}
switch(right.arity){case"assignment":case"pre":case"post":warn("unexpected_a",right);break;}
if(option.es6&&left.arity==="unary"&&(left.id==="["||left.id==="{")){warn("expected_a_before_b",left,"const",left.id);}else{mutation_check(left);}
return the_token;};return the_symbol;}
function constant(id,type,value){var the_symbol=symbol(id);the_symbol.constant=true;the_symbol.nud=(typeof value==="function")?value:function(){token.constant=true;if(value!==undefined){token.value=value;}
return token;};the_symbol.type=type;the_symbol.value=value;return the_symbol;}
function infix(id,bp,f){var the_symbol=symbol(id,bp);the_symbol.led=function(left){var the_token=token;the_token.arity="binary";if(f!==undefined){return f(left);}
the_token.expression=[left,expression(bp)];return the_token;};return the_symbol;}
function post(id){var the_symbol=symbol(id,150);the_symbol.led=function(left){token.expression=left;token.arity="post";mutation_check(token.expression);return token;};return the_symbol;}
function pre(id){var the_symbol=symbol(id);the_symbol.nud=function(){var the_token=token;the_token.arity="pre";the_token.expression=expression(150);mutation_check(the_token.expression);return the_token;};return the_symbol;}
function prefix(id,f){var the_symbol=symbol(id);the_symbol.nud=function(){var the_token=token;the_token.arity="unary";if(typeof f==="function"){return f();}
the_token.expression=expression(150);return the_token;};return the_symbol;}
function stmt(id,f){var the_symbol=symbol(id);the_symbol.fud=function(){token.arity="statement";return f();};return the_symbol;}
function ternary(id1,id2){var the_symbol=symbol(id1,30);the_symbol.led=function(left){var the_token=token;var second=expression(20);advance(id2);token.arity="ternary";the_token.arity="ternary";the_token.expression=[left,second,expression(10)];return the_token;};return the_symbol;}
syntax=empty();symbol("}");symbol(")");symbol("]");symbol(",");symbol(";");symbol(":");symbol("*/");symbol("await");symbol("case");symbol("catch");symbol("class");symbol("default");symbol("else");symbol("enum");symbol("finally");symbol("implements");symbol("interface");symbol("package");symbol("private");symbol("protected");symbol("public");symbol("static");symbol("super");symbol("void");symbol("yield");constant("(number)","number");constant("(regexp)","regexp");constant("(string)","string");constant("arguments","object",function(){if(option.es6){warn("unexpected_a",token);}
return token;});constant("eval","function",function(){if(!option.eval){warn("unexpected_a",token);}else if(next_token.id!=="("){warn("expected_a_before_b",next_token,"(",artifact());}
return token;});constant("false","boolean",false);constant("Function","function",function(){if(!option.eval){warn("unexpected_a",token);}else if(next_token.id!=="("){warn("expected_a_before_b",next_token,"(",artifact());}
return token;});constant("ignore","undefined",function(){warn("unexpected_a",token);return token;});constant("Infinity","number",Infinity);constant("isNaN","function",function(){if(option.es6){warn("expected_a_b",token,"Number.isNaN","isNaN");}
return token;});constant("NaN","number",NaN);constant("null","null",null);constant("this","object",function(){if(!option.this){warn("unexpected_a",token);}
return token;});constant("true","boolean",true);constant("undefined","undefined");assignment("=");assignment("+=");assignment("-=");assignment("*=");assignment("/=");assignment("%=");assignment("&=");assignment("|=");assignment("^=");assignment("<<=");assignment(">>=");assignment(">>>=");infix("||",40);infix("&&",50);infix("|",70);infix("^",80);infix("&",90);infix("==",100);infix("===",100);infix("!=",100);infix("!==",100);infix("<",110);infix(">",110);infix("<=",110);infix(">=",110);infix("in",110);infix("instanceof",110);infix("<<",120);infix(">>",120);infix(">>>",120);infix("+",130);infix("-",130);infix("*",140);infix("/",140);infix("%",140);infix("(",160,function(left){var the_paren=token;var the_argument;if(left.id!=="function"){left_check(left,the_paren);}
if(functionage.arity==="statement"&&left.identifier){functionage.name.calls[left.id]=left;}
the_paren.expression=[left];if(next_token.id!==")"){(function next(){var ellipsis;if(next_token.id==="..."){if(!option.es6){warn("es6");}
ellipsis=true;advance("...");}
the_argument=expression(10);if(ellipsis){the_argument.ellipsis=true;}
the_paren.expression.push(the_argument);if(next_token.id===","){advance(",");return next();}}());}
advance(")",the_paren);if(the_paren.expression.length===2){the_paren.free=true;if(the_argument.wrapped===true){warn("unexpected_a",the_paren);}
if(the_argument.id==="("){the_argument.wrapped=true;}}else{the_paren.free=false;}
return the_paren;});infix(".",170,function(left){var the_token=token;var name=next_token;if((left.id!=="(string)"||name.id!=="indexOf")&&(left.id!=="["||(name.id!=="concat"&&name.id!=="forEach"))&&(left.id!=="+"||name.id!=="slice")&&(left.id!=="(regexp)"||(name.id!=="exec"&&name.id!=="test"))){left_check(left,the_token);}
if(!name.identifier){stop("expected_identifier_a");}
advance();survey(name);the_token.name=name;the_token.expression=left;return the_token;});infix("[",170,function(left){var the_token=token;var the_subscript=expression(0);if(the_subscript.id==="(string)"||the_subscript.id==="`"){var name=survey(the_subscript);if(rx_identifier.test(name)){warn("subscript_a",the_subscript,name);}}
left_check(left,the_token);the_token.expression=[left,the_subscript];advance("]");return the_token;});infix("=>",170,function(left){return stop("wrap_parameter",left);});function do_tick(){var the_tick=token;if(!option.es6){warn("es6",the_tick);}
the_tick.value=[];the_tick.expression=[];if(next_token.id!=="`"){(function part(){advance("(string)");the_tick.value.push(token);if(next_token.id==="${"){advance("${");the_tick.expression.push(expression(0));advance("}");return part();}}());}
advance("`");return the_tick;}
infix("`",160,function(left){var the_tick=do_tick();left_check(left,the_tick);the_tick.expression=[left].concat(the_tick.expression);return the_tick;});post("++");post("--");pre("++");pre("--");prefix("+");prefix("-");prefix("~");prefix("!");prefix("!!");prefix("[",function(){var the_token=token;the_token.expression=[];if(next_token.id!=="]"){(function next(){var element;var ellipsis=false;if(next_token.id==="..."){ellipsis=true;if(!option.es6){warn("es6");}
advance("...");}
element=expression(10);if(ellipsis){element.ellipsis=true;}
the_token.expression.push(element);if(next_token.id===","){advance(",");return next();}}());}
advance("]");return the_token;});prefix("/=",function(){stop("expected_a_b",token,"/\\=","/=");});prefix("=>",function(){return stop("expected_a_before_b",token,"()","=>");});prefix("new",function(){var the_new=token;var right=expression(160);if(next_token.id!=="("){warn("expected_a_before_b",next_token,"()",artifact(next_token));}
the_new.expression=right;return the_new;});prefix("typeof");prefix("void",function(){var the_void=token;warn("unexpected_a",the_void);the_void.expression=expression(0);return the_void;});function parameter_list(){var complex=false;var list=[];var signature=["("];if(next_token.id!==")"&&next_token.id!=="(end)"){(function parameter(){var ellipsis=false;var param;if(next_token.id==="{"){complex=true;if(!option.es6){warn("es6");}
param=next_token;param.names=[];advance("{");signature.push("{");(function subparameter(){var subparam=next_token;if(!subparam.identifier){return stop("expected_identifier_a");}
survey(subparam);advance();signature.push(subparam.id);if(next_token.id===":"){advance(":");advance();token.label=subparam;subparam=token;if(!subparam.identifier){return stop("expected_identifier_a");}}
param.names.push(subparam);if(next_token.id===","){advance(",");signature.push(", ");return subparameter();}}());list.push(param);advance("}");signature.push("}");if(next_token.id===","){advance(",");signature.push(", ");return parameter();}}else if(next_token.id==="["){complex=true;if(!option.es6){warn("es6");}
param=next_token;param.names=[];advance("[");signature.push("[]");(function subparameter(){var subparam=next_token;if(!subparam.identifier){return stop("expected_identifier_a");}
advance();param.names.push(subparam);if(next_token.id===","){advance(",");return subparameter();}}());list.push(param);advance("]");if(next_token.id===","){advance(",");signature.push(", ");return parameter();}}else{if(next_token.id==="..."){complex=true;if(!option.es6){warn("es6");}
ellipsis=true;signature.push("...");advance("...");}
if(!next_token.identifier){return stop("expected_identifier_a");}
param=next_token;list.push(param);advance();signature.push(param.id);if(ellipsis){param.ellipsis=true;}else{if(next_token.id==="="){complex=true;if(!option.es6){stop("unexpected_statement_a");}
advance("=");param.expression=expression(0);}
if(next_token.id===","){advance(",");signature.push(", ");return parameter();}}}}());}
advance(")");signature.push(")");return[list,signature.join(""),complex];}
function do_function(the_function){var name;if(the_function===undefined){the_function=token;if(the_function.arity==="statement"){if(!next_token.identifier){return stop("expected_identifier_a",next_token);}
name=next_token;enroll(name,"variable",true);the_function.name=name;name.init=true;name.calls=empty();advance();}else if(name===undefined){if(next_token.identifier){name=next_token;the_function.name=name;advance();}else{the_function.name=anon;}}}else{name=the_function.name;}
the_function.level=functionage.level+1;if(mega_mode){warn("unexpected_a",the_function);}
if(functionage.loop>0){warn("function_in_loop",the_function);}
the_function.context=empty();the_function.finally=0;the_function.loop=0;the_function.switch=0;the_function.try=0;stack.push(functionage);functions.push(the_function);functionage=the_function;if(the_function.arity!=="statement"&&typeof name==="object"){enroll(name,"function",true);name.dead=false;name.init=true;name.used=1;}
advance("(");token.free=false;token.arity="function";var pl=parameter_list();functionage.parameters=pl[0];functionage.signature=pl[1];functionage.complex=pl[2];functionage.parameters.forEach(function enroll_parameter(name){if(name.identifier){enroll(name,"parameter",false);}else{name.names.forEach(enroll_parameter);}});the_function.block=block("body");if(the_function.arity==="statement"&&next_token.line===token.line){return stop("unexpected_a",next_token);}
if(next_token.id==="."||next_token.id==="["){warn("unexpected_a");}
functionage=stack.pop();return the_function;}
prefix("function",do_function);function fart(pl){if(next_token.id===";"){stop("wrap_assignment",token);}
advance("=>");var the_fart=token;the_fart.arity="binary";the_fart.name="=>";the_fart.level=functionage.level+1;functions.push(the_fart);if(functionage.loop>0){warn("function_in_loop",the_fart);}
the_fart.context=empty();the_fart.finally=0;the_fart.loop=0;the_fart.switch=0;the_fart.try=0;stack.push(functionage);functionage=the_fart;the_fart.parameters=pl[0];the_fart.signature=pl[1];the_fart.complex=true;the_fart.parameters.forEach(function(name){enroll(name,"parameter",true);});if(!option.es6){warn("es6",the_fart);}
if(next_token.id==="{"){warn("expected_a_b",the_fart,"function","=>");the_fart.block=block("body");}else{the_fart.expression=expression(0);}
functionage=stack.pop();return the_fart;}
prefix("(",function(){var the_paren=token;var the_value;var cadet=lookahead().id;if(next_token.id===")"||next_token.id==="..."||(next_token.identifier&&(cadet===","||cadet==="="))){the_paren.free=false;return fart(parameter_list());}
the_paren.free=true;the_value=expression(0);if(the_value.wrapped===true){warn("unexpected_a",the_paren);}
the_value.wrapped=true;advance(")",the_paren);if(next_token.id==="=>"){if(the_value.arity!=="variable"){if(the_value.id==="{"||the_value.id==="["){warn("expected_a_before_b",the_paren,"function","(");return stop("expected_a_b",next_token,"{","=>");}
return stop("expected_identifier_a",the_value);}
the_paren.expression=[the_value];return fart([the_paren.expression,"("+the_value.id+")"]);}
return the_value;});prefix("`",do_tick);prefix("{",function(){var the_brace=token;var seen=empty();the_brace.expression=[];if(next_token.id!=="}"){(function member(){var extra;var id;var name=next_token;var value;advance();if((name.id==="get"||name.id==="set")&&next_token.identifier){extra=name.id+" "+next_token.id;name=next_token;advance();id=survey(name);if(seen[extra]===true||seen[id]===true){warn("duplicate_a",name);}
seen[id]=false;seen[extra]=true;}else{id=survey(name);if(typeof seen[id]==="boolean"){warn("duplicate_a",name);}
seen[id]=true;}
if(name.identifier){switch(next_token.id){case"}":case",":if(!option.es6){warn("es6");}
if(typeof extra==="string"){advance("(");}
value=expression(Infinity,true);break;case"(":if(!option.es6&&typeof extra!=="string"){warn("es6");}
value=do_function({arity:"unary",from:name.from,id:"function",line:name.line,name:(typeof extra==="string")?extra:id,thru:name.from});break;default:if(typeof extra==="string"){advance("(");}
advance(":");value=expression(0);}
value.label=name;if(typeof extra==="string"){value.extra=extra;}
the_brace.expression.push(value);}else{advance(":");value=expression(0);value.label=name;the_brace.expression.push(value);}
if(next_token.id===","){advance(",");return member();}}());}
advance("}");return the_brace;});stmt(";",function(){warn("unexpected_a",token);return token;});stmt("{",function(){warn("naked_block",token);return block("naked");});stmt("break",function(){var the_break=token;var the_label;if((functionage.loop<1&&functionage.switch<1)||functionage.finally>0){warn("unexpected_a",the_break);}
the_break.disrupt=true;if(next_token.identifier&&token.line===next_token.line){the_label=functionage.context[next_token.id];if(the_label===undefined||the_label.role!=="label"||the_label.dead){warn((the_label!==undefined&&the_label.dead)?"out_of_scope_a":"not_label_a");}else{the_label.used+=1;}
the_break.label=next_token;advance();}
advance(";");return the_break;});function do_var(){var the_statement=token;var is_const=the_statement.id==="const";the_statement.names=[];if(is_const){if(!option.es6){warn("es6",the_statement);}}else if(var_mode===undefined){var_mode=the_statement.id;if(!option.es6&&var_mode!=="var"){warn("es6",the_statement);}}else if(the_statement.id!==var_mode){warn("expected_a_b",the_statement,var_mode,the_statement.id);}
if(functionage.switch>0){warn("var_switch",the_statement);}
if(functionage.loop>0&&the_statement.id==="var"){warn("var_loop",the_statement);}
(function next(){if(next_token.id==="{"&&the_statement.id!=="var"){var the_brace=next_token;the_brace.names=[];advance("{");(function pair(){if(!next_token.identifier){return stop("expected_identifier_a",next_token);}
var name=next_token;survey(name);advance();if(next_token.id===":"){advance(":");if(!next_token.identifier){return stop("expected_identifier_a",next_token);}
next_token.label=name;the_brace.names.push(next_token);enroll(next_token,"variable",is_const);advance();}else{the_brace.names.push(name);enroll(name,"variable",is_const);}
if(next_token.id===","){advance(",");return pair();}}());advance("}");advance("=");the_brace.expression=expression(0);the_statement.names.push(the_brace);}else if(next_token.id==="["&&the_statement.id!=="var"){var the_bracket=next_token;the_bracket.names=[];advance("[");(function element(){var ellipsis;if(next_token.id==="..."){ellipsis=true;advance("...");}
if(!next_token.identifier){return stop("expected_identifier_a",next_token);}
var name=next_token;advance();the_bracket.names.push(name);enroll(name,"variable",the_statement.id==="const");if(ellipsis){name.ellipsis=true;}else if(next_token.id===","){advance(",");return element();}}());advance("]");advance("=");the_bracket.expression=expression(0);the_statement.names.push(the_bracket);}else if(next_token.identifier){var name=next_token;advance();if(name.id==="ignore"){warn("unexpected_a",name);}
enroll(name,"variable",is_const);if(next_token.id==="="||is_const){advance("=");name.expression=expression(0);name.init=true;}
the_statement.names.push(name);}else{return stop("expected_identifier_a",next_token);}
if(next_token.id===","){if(!option.multivar){warn("expected_a_b",next_token,";",",");}
advance(",");return next();}}());the_statement.open=the_statement.names.length>1&&the_statement.line!==the_statement.names[1].line;semicolon();return the_statement;}
stmt("const",do_var);stmt("continue",function(){var the_continue=token;if(functionage.loop<1||functionage.finally>0){warn("unexpected_a",the_continue);}
not_top_level(the_continue);the_continue.disrupt=true;warn("unexpected_a",the_continue);advance(";");return the_continue;});stmt("debugger",function(){var the_debug=token;if(!option.devel){warn("unexpected_a",the_debug);}
semicolon();return the_debug;});stmt("delete",function(){var the_token=token;var the_value=expression(0);if((the_value.id!=="."&&the_value.id!=="[")||the_value.arity!=="binary"){stop("expected_a_b",the_value,".",artifact(the_value));}
the_token.expression=the_value;semicolon();return the_token;});stmt("do",function(){var the_do=token;not_top_level(the_do);functionage.loop+=1;the_do.block=block();advance("while");the_do.expression=condition();semicolon();if(the_do.block.disrupt===true){warn("weird_loop",the_do);}
functionage.loop-=1;return the_do;});stmt("export",function(){var the_export=token;var the_id;var the_name;var the_thing;function export_id(){if(!next_token.identifier){stop("expected_identifier_a");}
the_id=next_token.id;the_name=global.context[the_id];if(the_name===undefined){warn("unexpected_a");}else{the_name.used+=1;if(exports[the_id]!==undefined){warn("duplicate_a");}
exports[the_id]=the_name;}
advance();the_export.expression.push(the_thing);}
if(!option.es6){warn("es6",the_export);}
the_export.expression=[];if(next_token.id==="default"){if(exports.default!==undefined){warn("duplicate_a");}
advance("default");the_thing=expression();if(the_thing.id!=="function"){semicolon();}
exports.default=the_thing;the_export.expression.push(the_thing);}else{switch(next_token.id){case"function":the_thing=statement();the_name=the_thing.name;the_id=the_name.id;the_name.used+=1;if(exports[the_id]!==undefined){warn("duplicate_a",the_name);}
exports[the_id]=the_thing;the_export.expression.push(the_thing);the_thing.statement=false;the_thing.arity="unary";break;case"var":case"let":case"const":warn("unexpected_a");break;case"{":advance("{");(function loop(){export_id();if(next_token.id===","){advance(",");return loop();}}());advance("}");semicolon();break;default:export_id();if(the_name.writable!==true){warn("unexpected_a",token);}
semicolon();}}
module_mode=true;return the_export;});stmt("for",function(){var first;var the_for=token;if(!option.for){warn("unexpected_a",the_for);}
not_top_level(the_for);functionage.loop+=1;advance("(");token.free=true;if(next_token.id===";"){return stop("expected_a_b",the_for,"while (","for (;");}
if(next_token.id==="var"||next_token.id==="let"||next_token.id==="const"){return stop("unexpected_a");}
first=expression(0);if(first.id==="in"){if(first.expression[0].arity!=="variable"){warn("bad_assignment_a",first.expression[0]);}
the_for.name=first.expression[0];the_for.expression=first.expression[1];warn("expected_a_b",the_for,"Object.keys","for in");}else{the_for.initial=first;advance(";");the_for.expression=expression(0);advance(";");the_for.inc=expression(0);if(the_for.inc.id==="++"){warn("expected_a_b",the_for.inc,"+= 1","++");}}
advance(")");the_for.block=block();if(the_for.block.disrupt===true){warn("weird_loop",the_for);}
functionage.loop-=1;return the_for;});stmt("function",do_function);stmt("if",function(){var the_else;var the_if=token;the_if.expression=condition();the_if.block=block();if(next_token.id==="else"){advance("else");the_else=token;the_if.else=(next_token.id==="if")?statement():block();if(the_if.block.disrupt===true){if(the_if.else.disrupt===true){the_if.disrupt=true;}else{warn("unexpected_a",the_else);}}}
return the_if;});stmt("import",function(){var the_import=token;var name;if(!option.es6){warn("es6",the_import);}else if(typeof module_mode==="object"){warn("unexpected_directive_a",module_mode,module_mode.directive);}
module_mode=true;if(next_token.identifier){name=next_token;advance();if(name.id==="ignore"){warn("unexpected_a",name);}
enroll(name,"variable",true);the_import.name=name;}else{var names=[];advance("{");if(next_token.id!=="}"){while(true){if(!next_token.identifier){stop("expected_identifier_a");}
name=next_token;advance();if(name.id==="ignore"){warn("unexpected_a",name);}
enroll(name,"variable",true);names.push(name);if(next_token.id!==","){break;}
advance(",");}}
advance("}");the_import.name=names;}
advance("from");advance("(string)");the_import.import=token;if(!rx_module.test(token.value)){warn("bad_module_name_a",token);}
froms.push(token.value);semicolon();return the_import;});stmt("let",do_var);stmt("return",function(){var the_return=token;not_top_level(the_return);if(functionage.finally>0){warn("unexpected_a",the_return);}
the_return.disrupt=true;if(next_token.id!==";"&&the_return.line===next_token.line){the_return.expression=expression(10);}
advance(";");return the_return;});stmt("switch",function(){var dups=[];var last;var stmts;var the_cases=[];var the_disrupt=true;var the_switch=token;not_top_level(the_switch);if(functionage.finally>0){warn("unexpected_a",the_switch);}
functionage.switch+=1;advance("(");token.free=true;the_switch.expression=expression(0);the_switch.block=the_cases;advance(")");advance("{");(function major(){var the_case=next_token;the_case.arity="statement";the_case.expression=[];(function minor(){advance("case");token.switch=true;var exp=expression(0);if(dups.some(function(thing){return are_similar(thing,exp);})){warn("unexpected_a",exp);}
dups.push(exp);the_case.expression.push(exp);advance(":");if(next_token.id==="case"){return minor();}}());stmts=statements();if(stmts.length<1){warn("expected_statements_a");return;}
the_case.block=stmts;the_cases.push(the_case);last=stmts[stmts.length-1];if(last.disrupt){if(last.id==="break"&&last.label===undefined){the_disrupt=false;}}else{warn("expected_a_before_b",next_token,"break;",artifact(next_token));}
if(next_token.id==="case"){return major();}}());dups=undefined;if(next_token.id==="default"){var the_default=next_token;advance("default");token.switch=true;advance(":");the_switch.else=statements();if(the_switch.else.length<1){warn("unexpected_a",the_default);the_disrupt=false;}else{var the_last=the_switch.else[the_switch.else.length-1];if(the_last.id==="break"&&the_last.label===undefined){warn("unexpected_a",the_last);the_last.disrupt=false;}
the_disrupt=the_disrupt&&the_last.disrupt;}}else{the_disrupt=false;}
advance("}",the_switch);functionage.switch-=1;the_switch.disrupt=the_disrupt;return the_switch;});stmt("throw",function(){var the_throw=token;the_throw.disrupt=true;the_throw.expression=expression(10);semicolon();return the_throw;});stmt("try",function(){var the_catch;var the_disrupt;var the_try=token;if(functionage.try>0){warn("unexpected_a",the_try);}
functionage.try+=1;the_try.block=block();the_disrupt=the_try.block.disrupt;if(next_token.id==="catch"){var ignored="ignore";the_catch=next_token;the_try.catch=the_catch;advance("catch");advance("(");if(!next_token.identifier){return stop("expected_identifier_a",next_token);}
if(next_token.id!=="ignore"){ignored=undefined;the_catch.name=next_token;enroll(next_token,"exception",true);}
advance();advance(")");the_catch.block=block(ignored);if(the_catch.block.disrupt!==true){the_disrupt=false;}}else{warn("expected_a_before_b",next_token,"catch",artifact(next_token));}
if(next_token.id==="finally"){functionage.finally+=1;advance("finally");the_try.else=block();the_disrupt=the_try.else.disrupt;functionage.finally-=1;}
the_try.disrupt=the_disrupt;functionage.try-=1;return the_try;});stmt("var",do_var);stmt("while",function(){var the_while=token;not_top_level(the_while);functionage.loop+=1;the_while.expression=condition();the_while.block=block();if(the_while.block.disrupt===true){warn("weird_loop",the_while);}
functionage.loop-=1;return the_while;});stmt("with",function(){stop("unexpected_a",token);});ternary("?",":");function action(when){return function(arity,id,task){var a_set=when[arity];var i_set;if(typeof id!=="string"){task=id;id="(all)";}
if(a_set===undefined){a_set=empty();when[arity]=a_set;}
i_set=a_set[id];if(i_set===undefined){i_set=[];a_set[id]=i_set;}
i_set.push(task);};}
function amble(when){return function(the_token){var a_set=when[the_token.arity];var i_set;if(a_set!==undefined){i_set=a_set[the_token.id];if(i_set!==undefined){i_set.forEach(function(task){return task(the_token);});}
i_set=a_set["(all)"];if(i_set!==undefined){i_set.forEach(function(task){return task(the_token);});}}};}
var posts=empty();var pres=empty();var preaction=action(pres);var postaction=action(posts);var preamble=amble(pres);var postamble=amble(posts);function walk_expression(thing){if(thing){if(Array.isArray(thing)){thing.forEach(walk_expression);}else{preamble(thing);walk_expression(thing.expression);if(thing.id==="function"){walk_statement(thing.block);}
switch(thing.arity){case"post":case"pre":warn("unexpected_a",thing);break;case"statement":case"assignment":warn("unexpected_statement_a",thing);break;}
postamble(thing);}}}
function walk_statement(thing){if(thing){if(Array.isArray(thing)){thing.forEach(walk_statement);}else{preamble(thing);walk_expression(thing.expression);switch(thing.arity){case"statement":case"assignment":break;case"binary":if(thing.id!=="("){warn("unexpected_expression_a",thing);}
break;default:warn((thing.id==="(string)"&&thing.value==="use strict")?"unexpected_a":"unexpected_expression_a",thing);}
walk_statement(thing.block);walk_statement(thing.else);postamble(thing);}}}
function lookup(thing){if(thing.arity==="variable"){var the_variable=functionage.context[thing.id];if(the_variable===undefined){stack.forEach(function(outer){var a_variable=outer.context[thing.id];if(a_variable!==undefined&&a_variable.role!=="label"){the_variable=a_variable;}});if(the_variable===undefined){if(declared_globals[thing.id]===undefined){warn("undeclared_a",thing);return;}
the_variable={dead:false,function:global,id:thing.id,init:true,role:"variable",used:0,writable:false};global.context[thing.id]=the_variable;}
the_variable.closure=true;functionage.context[thing.id]=the_variable;}else if(the_variable.role==="label"){warn("label_a",thing);}
if(the_variable.dead){warn("out_of_scope_a",thing);}
return the_variable;}}
function subactivate(name){name.init=true;name.dead=false;blockage.live.push(name);}
function preaction_function(thing){if(thing.arity==="statement"&&blockage.body!==true){warn("unexpected_a",thing);}
if(thing.level===1){if(module_mode===true||global.strict!==undefined||thing.complex){if(thing.id!=="=>"&&thing.block.strict!==undefined){warn("unexpected_a",thing.block.strict);}}else{if(thing.block.strict===undefined){warn("use_strict",thing);}}}
stack.push(functionage);block_stack.push(blockage);functionage=thing;blockage=thing;thing.live=[];if(typeof thing.name==="object"){thing.name.dead=false;thing.name.init=true;}
switch(thing.extra){case"get":if(thing.parameters.length!==0){warn("bad_get",thing);}
break;case"set":if(thing.parameters.length!==1){warn("bad_set",thing);}
break;}
thing.parameters.forEach(function(name){walk_expression(name.expression);if(name.id==="{"||name.id==="["){name.names.forEach(subactivate);}else{name.dead=false;name.init=true;}});}
function bitwise_check(thing){if(!option.bitwise&&bitwiseop[thing.id]===true){warn("unexpected_a",thing);}
if(thing.id!=="("&&thing.id!=="&&"&&thing.id!=="||"&&thing.id!=="="&&Array.isArray(thing.expression)&&thing.expression.length===2&&(relationop[thing.expression[0].id]===true||relationop[thing.expression[1].id]===true)){warn("unexpected_a",thing);}}
function pop_block(){blockage.live.forEach(function(name){name.dead=true;});delete blockage.live;blockage=block_stack.pop();}
function activate(name){if(name.expression!==undefined){walk_expression(name.expression);if(name.id==="{"||name.id==="["){name.names.forEach(subactivate);}else{name.init=true;}}
name.dead=false;blockage.live.push(name);}
function action_var(thing){thing.names.forEach(activate);}
preaction("assignment",bitwise_check);preaction("binary",bitwise_check);preaction("binary",function(thing){if(relationop[thing.id]===true){var left=thing.expression[0];var right=thing.expression[1];if(left.id==="NaN"||right.id==="NaN"){if(option.es6){warn("number_isNaN",thing);}else{warn("isNaN",thing);}}else if(left.id==="typeof"){if(right.id!=="(string)"){if(right.id!=="typeof"){warn("expected_string_a",right);}}else{var value=right.value;if(value==="symbol"){if(!option.es6){warn("es6",right,value);}}else if(value==="null"||value==="undefined"){warn("unexpected_typeof_a",right,value);}else if(value!=="boolean"&&value!=="function"&&value!=="number"&&value!=="object"&&value!=="string"){warn("expected_type_string_a",right,value);}}}}});preaction("binary","==",function(thing){warn("expected_a_b",thing,"===","==");});preaction("binary","!=",function(thing){warn("expected_a_b",thing,"!==","!=");});preaction("binary","=>",preaction_function);preaction("binary","||",function(thing){thing.expression.forEach(function(thang){if(thang.id==="&&"&&!thang.wrapped){warn("and",thang);}});});preaction("binary","(",function(thing){var left=thing.expression[0];if(left.identifier&&functionage.context[left.id]===undefined&&typeof functionage.name==="object"){var parent=functionage.name.function;if(parent){var left_variable=parent.context[left.id];if(left_variable!==undefined&&left_variable.dead&&left_variable.function===parent&&left_variable.calls!==undefined&&left_variable.calls[functionage.name.id]!==undefined){left_variable.dead=false;}}}});preaction("binary","in",function(thing){warn("infix_in",thing);});preaction("binary","instanceof",function(thing){warn("unexpected_a",thing);});preaction("binary",".",function(thing){if(thing.expression.new){thing.new=true;}});preaction("statement","{",function(thing){block_stack.push(blockage);blockage=thing;thing.live=[];});preaction("statement","for",function(thing){if(thing.name!==undefined){var the_variable=lookup(thing.name);if(the_variable!==undefined){the_variable.init=true;if(!the_variable.writable){warn("bad_assignment_a",thing.name);}}}
walk_statement(thing.initial);});preaction("statement","function",preaction_function);preaction("unary","~",bitwise_check);preaction("unary","function",preaction_function);preaction("variable",function(thing){var the_variable=lookup(thing);if(the_variable!==undefined){thing.variable=the_variable;the_variable.used+=1;}});function init_variable(name){var the_variable=lookup(name);if(the_variable!==undefined){if(the_variable.writable){the_variable.init=true;return;}}
warn("bad_assignment_a",name);}
postaction("assignment",function(thing){var lvalue=thing.expression[0];if(thing.id==="="){if(thing.names!==undefined){if(Array.isArray(thing.names)){thing.names.forEach(init_variable);}else{init_variable(thing.names);}}else{if(lvalue.id==="."&&thing.expression[1].id==="undefined"){warn("expected_a_b",lvalue.expression,"delete","undefined");}}}else{if(lvalue.arity==="variable"){if(!lvalue.variable||lvalue.variable.writable!==true){warn("bad_assignment_a",lvalue);}}
var right=syntax[thing.expression[1].id];if(right!==undefined&&(right.id==="function"||right.id==="=>"||(right.constant&&right.id!=="(number)"&&(right.id!=="(string)"||thing.id!=="+=")))){warn("unexpected_a",thing.expression[1]);}}});function postaction_function(thing){delete functionage.finally;delete functionage.loop;delete functionage.switch;delete functionage.try;functionage=stack.pop();if(thing.wrapped){warn("unexpected_parens",thing);}
return pop_block();}
postaction("binary",function(thing){var right;if(relationop[thing.id]){if(is_weird(thing.expression[0])||is_weird(thing.expression[1])||are_similar(thing.expression[0],thing.expression[1])||(thing.expression[0].constant===true&&thing.expression[1].constant===true)){warn("weird_relation_a",thing);}}
switch(thing.id){case"+":case"-":right=thing.expression[1];if(right.id===thing.id&&right.arity==="unary"&&!right.wrapped){warn("wrap_unary",right);}
break;case"=>":case"(":break;case".":if(thing.expression.id==="RegExp"){warn("weird_expression_a",thing);}
break;default:if(thing.expression[0].constant===true&&thing.expression[1].constant===true){thing.constant=true;}}});postaction("binary","&&",function(thing){if(is_weird(thing.expression[0])||are_similar(thing.expression[0],thing.expression[1])||thing.expression[0].constant===true||thing.expression[1].constant===true){warn("weird_condition_a",thing);}});postaction("binary","||",function(thing){if(is_weird(thing.expression[0])||are_similar(thing.expression[0],thing.expression[1])||thing.expression[0].constant===true){warn("weird_condition_a",thing);}});postaction("binary","=>",postaction_function);postaction("binary","(",function(thing){var left=thing.expression[0];var the_new;if(left.id==="new"){the_new=left;left=left.expression;}
if(left.id==="function"){if(!thing.wrapped){warn("wrap_immediate",thing);}}else if(left.identifier){if(the_new!==undefined){if(left.id.charAt(0)>"Z"||left.id==="Boolean"||left.id==="Number"||left.id==="String"||(left.id==="Symbol"&&option.es6)){warn("unexpected_a",the_new);}else if(left.id==="Function"){if(!option.eval){warn("unexpected_a",left,"new Function");}}else if(left.id==="Array"){warn("expected_a_b",left,"[]","new Array");}else if(left.id==="Object"){warn("expected_a_b",left,"Object.create(null)","new Object");}}else{if(left.id.charAt(0)>="A"&&left.id.charAt(0)<="Z"&&left.id!=="Boolean"&&left.id!=="Number"&&left.id!=="String"&&left.id!=="Symbol"){warn("expected_a_before_b",left,"new",artifact(left));}}}else if(left.id==="."){var cack=the_new!==undefined;if(left.expression.id==="Date"&&left.name.id==="UTC"){cack=!cack;}
if(rx_cap.test(left.name.id)!==cack){if(the_new!==undefined){warn("unexpected_a",the_new);}else{warn("expected_a_before_b",left.expression,"new",left.name.id);}}
if(left.name.id==="getTime"){var l1=left.expression;if(l1.id==="("){var l2=l1.expression;if(l2.length===1){var l3=l2[0];if(l3.id==="new"&&l3.expression.id==="Date"){warn("expected_a_b",l3,"Date.now()","new Date().getTime()");}}}}}});postaction("binary","[",function(thing){if(thing.expression[0].id==="RegExp"){warn("weird_expression_a",thing);}
if(is_weird(thing.expression[1])){warn("weird_expression_a",thing.expression[1]);}});postaction("statement","{",pop_block);postaction("statement","const",action_var);postaction("statement","export",top_level_only);postaction("statement","for",function(thing){walk_statement(thing.inc);});postaction("statement","function",postaction_function);postaction("statement","import",function(the_thing){var name=the_thing.name;if(Array.isArray(name)){name.forEach(function(name){name.dead=false;name.init=true;blockage.live.push(name);});}else{name.dead=false;name.init=true;blockage.live.push(name);}
return top_level_only(the_thing);});postaction("statement","let",action_var);postaction("statement","try",function(thing){if(thing.catch!==undefined){var the_name=thing.catch.name;if(the_name!==undefined){var the_variable=functionage.context[the_name.id];the_variable.dead=false;the_variable.init=true;}
walk_statement(thing.catch.block);}});postaction("statement","var",action_var);postaction("ternary",function(thing){if(is_weird(thing.expression[0])||thing.expression[0].constant===true||are_similar(thing.expression[1],thing.expression[2])){warn("unexpected_a",thing);}else if(are_similar(thing.expression[0],thing.expression[1])){warn("expected_a_b",thing,"||","?");}else if(are_similar(thing.expression[0],thing.expression[2])){warn("expected_a_b",thing,"&&","?");}else if(thing.expression[1].id==="true"&&thing.expression[2].id==="false"){warn("expected_a_b",thing,"!!","?");}else if(thing.expression[1].id==="false"&&thing.expression[2].id==="true"){warn("expected_a_b",thing,"!","?");}else if(thing.expression[0].wrapped!==true&&(thing.expression[0].id==="||"||thing.expression[0].id==="&&")){warn("wrap_condition",thing.expression[0]);}});postaction("unary",function(thing){switch(thing.id){case"[":case"{":case"function":case"new":break;case"`":if(thing.expression.every(function(thing){return thing.constant;})){thing.constant=true;}
break;case"!":if(thing.expression.constant===true){warn("unexpected_a",thing);}
break;default:if(thing.expression.constant===true){thing.constant=true;}}});postaction("unary","function",postaction_function);function delve(the_function){Object.keys(the_function.context).forEach(function(id){if(id!=="ignore"){var name=the_function.context[id];if(name.function===the_function){if(name.used===0&&(name.role!=="function"||name.function.arity!=="unary")){warn("unused_a",name);}else if(!name.init){warn("uninitialized_a",name);}}}});}
function uninitialized_and_unused(){if(module_mode===true||option.node){delve(global);}
functions.forEach(delve);}
function whitage(){var closer="(end)";var free=false;var left=global;var margin=0;var nr_comments_skipped=0;var open=true;var qmark="";var result;var right;function expected_at(at){warn("expected_a_at_b_c",right,artifact(right),fudge+at,artifact_column(right));}
function at_margin(fit){var at=margin+fit;if(right.from!==at){return expected_at(at);}}
function no_space_only(){if(left.id!=="(global)"&&left.nr+1===right.nr&&(left.line!==right.line||left.thru!==right.from)){warn("unexpected_space_a_b",right,artifact(left),artifact(right));}}
function no_space(){if(left.line===right.line){if(left.thru!==right.from&&nr_comments_skipped===0){warn("unexpected_space_a_b",right,artifact(left),artifact(right));}}else{if(open){var at=(free)?margin:margin+8;if(right.from<at){expected_at(at);}}else{if(right.from!==margin+8){expected_at(margin+8);}}}}
function one_space_only(){if(left.line!==right.line||left.thru+1!==right.from){warn("expected_space_a_b",right,artifact(left),artifact(right));}}
function one_space(){if(left.line===right.line){if(left.thru+1!==right.from&&nr_comments_skipped===0){warn("expected_space_a_b",right,artifact(left),artifact(right));}}else{if(free){if(right.from<margin){expected_at(margin);}}else{if(right.from!==margin+8){expected_at(margin+8);}}}}
function unqmark(){var level=qmark.length;if(level>0){margin-=level*4;}
qmark="";}
stack=[];tokens.forEach(function(the_token){right=the_token;if(right.id==="(comment)"||right.id==="(end)"){nr_comments_skipped+=1;}else{var new_closer=opener[left.id];if(typeof new_closer==="string"){if(new_closer!==right.id){stack.push({closer:closer,free:free,margin:margin,open:open,qmark:qmark});qmark="";closer=new_closer;if(left.line!==right.line){free=closer===")"&&left.free;open=true;margin+=4;if(right.role==="label"){if(right.from!==0){expected_at(0);}}else if(right.switch){unqmark();at_margin(-4);}else{at_margin(0);}}else{if(right.statement||right.role==="label"){warn("expected_line_break_a_b",right,artifact(left),artifact(right));}
free=false;open=false;no_space_only();}}else{if(left.line===right.line){no_space();}else{at_margin(0);}}}else{if(right.id===closer){var previous=stack.pop();margin=previous.margin;if(open&&right.id!==";"){at_margin(0);}else{no_space_only();}
closer=previous.closer;free=previous.free;open=previous.open;qmark=previous.qmark;}else{if(right.switch){unqmark();at_margin(-4);}else if(right.role==="label"){if(right.from!==0){expected_at(0);}}else if(left.id===","){unqmark();if(!open||((free||closer==="]")&&left.line===right.line)){one_space();}else{at_margin(0);}}else if(right.arity==="ternary"){if(right.id==="?"){margin+=4;qmark+="?";}else{result=qmark.match(rx_colons);qmark=result[1]+":";margin-=4*result[2].length;}
at_margin(0);}else if(right.arity==="binary"&&right.id==="("&&free){no_space();}else if(left.id==="."||left.id==="..."||right.id===","||right.id===";"||right.id===":"||(right.arity==="binary"&&(right.id==="("||right.id==="["))||(right.arity==="function"&&left.id!=="function")){no_space_only();}else if(right.id==="."){if(left.line===right.line){no_space();}else{if(!rx_dot.test(qmark)){qmark+=".";margin+=4;}
at_margin(0);}}else if(left.id===";"){unqmark();if(open){at_margin(0);}else{one_space();}}else if(left.arity==="ternary"||left.id==="case"||left.id==="catch"||left.id==="else"||left.id==="finally"||left.id==="while"||right.id==="catch"||right.id==="else"||right.id==="finally"||(right.id==="while"&&!right.statement)||(left.id===")"&&right.id==="{")){one_space_only();}else if(right.statement===true){if(open){at_margin(0);}else{one_space();}}else if(left.id==="var"||left.id==="const"||left.id==="let"){stack.push({closer:closer,free:free,margin:margin,open:open,qmark:qmark});closer=";";free=false;open=left.open;qmark="";if(open){margin=margin+4;at_margin(0);}else{one_space_only();}}else if(spaceop[left.id]===true||spaceop[right.id]===true||(left.arity==="binary"&&(left.id==="+"||left.id==="-"))||(right.arity==="binary"&&(right.id==="+"||right.id==="-"))||left.id==="function"||left.id===":"||((left.identifier||left.id==="(string)"||left.id==="(number)")&&(right.identifier||right.id==="(string)"||right.id==="(number)"))||(left.arity==="statement"&&right.id!==";")){one_space();}else if(left.arity==="unary"&&left.id!=="`"){no_space_only();}}}
nr_comments_skipped=0;delete left.calls;delete left.dead;delete left.free;delete left.init;delete left.open;delete left.used;left=right;}});}
return function(source,option_object,global_array){try{warnings=[];option=Object.assign(empty(),option_object);anon="anonymous";block_stack=[];declared_globals=empty();directive_mode=true;directives=[];early_stop=true;exports=empty();froms=[];fudge=(option.fudge)?1:0;functions=[];global={id:"(global)",body:true,context:empty(),from:0,level:0,line:0,live:[],loop:0,switch:0,thru:0};blockage=global;functionage=global;json_mode=false;mega_mode=false;module_mode=false;next_token=global;property=empty();stack=[];tenure=undefined;token=global;token_nr=0;var_mode=undefined;populate(declared_globals,standard,false);if(global_array!==undefined){populate(declared_globals,global_array,false);}
Object.keys(option).forEach(function(name){if(option[name]===true){var allowed=allowed_option[name];if(Array.isArray(allowed)){populate(declared_globals,allowed,false);}}});tokenize(source);advance();if(json_mode){tree=json_value();advance("(end)");}else{if(option.browser){if(next_token.id===";"){advance(";");}}else{if(next_token.value==="use strict"){global.strict=next_token;advance("(string)");advance(";");}}
tree=statements();advance("(end)");functionage=global;walk_statement(tree);if(module_mode&&global.strict!==undefined){warn("unexpected_a",global.strict);}
uninitialized_and_unused();if(!option.white){whitage();}}
if(!option.browser){directives.forEach(function(comment){if(comment.directive==="global"){warn("missing_browser",comment);}});}
early_stop=false;}catch(e){if(e.name!=="JSLintError"){warnings.push(e);}}
return{directives:directives,edition:"2017-01-20",exports:exports,froms:froms,functions:functions,global:global,id:"(JSLint)",json:json_mode,lines:lines,module:module_mode===true,ok:warnings.length===0&&!early_stop,option:option,property:property,stop:early_stop,tokens:tokens,tree:tree,warnings:warnings.sort(function(a,b){return a.line-b.line||a.column-b.column;})};};}());var ADSAFE;ADSAFE=(function(){'use strict';var adsafe_id;var adsafe_lib;var banned={arguments:true,callee:true,caller:true,constructor:true,eval:true,prototype:true,stack:true,unwatch:true,valueOf:true,watch:true};var cache_style_object;var cache_style_node;var defaultView=document.defaultView;var ephemeral;var flipflop;var has_focus;var hunter;var interceptors=[];var makeableTagName={a:true,abbr:true,acronym:true,address:true,area:true,b:true,bdo:true,big:true,blockquote:true,br:true,button:true,canvas:true,caption:true,center:true,cite:true,code:true,col:true,colgroup:true,dd:true,del:true,dfn:true,dir:true,div:true,dl:true,dt:true,em:true,fieldset:true,font:true,form:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,hr:true,i:true,img:true,input:true,ins:true,kbd:true,label:true,legend:true,li:true,map:true,menu:true,object:true,ol:true,optgroup:true,option:true,p:true,pre:true,q:true,samp:true,select:true,small:true,span:true,strong:true,sub:true,sup:true,table:true,tbody:true,td:true,textarea:true,tfoot:true,th:true,thead:true,tr:true,tt:true,u:true,ul:true,var:true};var name;var pecker;var result;var star;var the_range;var value;function error(message){ADSAFE.log("ADsafe error: "+(message||"ADsafe violation."));throw{name:"ADsafe",message:message||"ADsafe violation."};}
function string_check(string){if(typeof string!=='string'){error("ADsafe string violation.");}
return string;}
function owns(object,string){return object&&typeof object==='object'&&Object.prototype.hasOwnProperty.call(object,string_check(string));}
function reject_name(name){return typeof name!=='number'&&(typeof name!=='string'||banned[name]||name.charAt(0)==='_'||name.slice(-1)==='_');}
function reject_property(object,name){return typeof object!=='object'||reject_name(name);}
function reject_global(that){if(that.window){error();}}
function getStyleObject(node){if(node===cache_style_node){return cache_style_object;}
cache_style_node=node;cache_style_object=node.currentStyle||defaultView.getComputedStyle(node,'');return cache_style_object;}
function walkTheDOM(node,func,skip){if(!skip){func(node);}
node=node.firstChild;while(node){walkTheDOM(node,func);node=node.nextSibling;}}
function purge_event_handlers(node){walkTheDOM(node,function(node){if(node.tagName){node['___ on ___']=null;node.change=null;}});}
function parse_query(text,id){var match;var query=[];var selector;var qx=(id)?/^\s*(?:([\*\/])|\[\s*([a-z][0-9a-z_\-]*)\s*(?:([!*~\|$\^]?=)\s*([0-9A-Za-z_\-*%&;.\/:!]+)\s*)?\]|#\s*([A-Z]+_[A-Z0-9]+)|:\s*([a-z]+)|([.&_>\+]?)\s*([a-z][0-9a-z\-]*))\s*/:/^\s*(?:([\*\/])|\[\s*([a-z][0-9a-z_\-]*)\s*(?:([!*~\|$\^]?=)\s*([0-9A-Za-z_\-*%&;.\/:!]+)\s*)?\]|#\s*([\-A-Za-z0-9_]+)|:\s*([a-z]+)|([.&_>\+]?)\s*([a-z][0-9a-z\-]*))\s*/;do{match=qx.exec(string_check(text));if(!match){error("ADsafe: Bad query:"+text);}
if(match[1]){selector={op:match[1]};}else if(match[2]){selector=(match[3])?{op:'['+match[3],name:match[2],value:match[4]}:{op:'[',name:match[2]};}else if(match[5]){if(query.length>0||match[5].length<=id.length||match[5].slice(0,id.length)!==id){error("ADsafe: Bad query: "+text);}
selector={op:'#',name:match[5]};}else if(match[6]){selector={op:':'+match[6]};}else{selector={op:match[7],name:match[8]};}
query.push(selector);text=text.slice(match[0].length);}while(text);return query;}
hunter={'':function(node){var array;var nodelist=node.getElementsByTagName(name);var i;var length;try{array=Array.prototype.slice.call(nodelist,0);result=(result.length)?result.concat(array):array;}catch(ignore){length=nodelist.length;for(i=0;i<length;i+=1){result.push(nodelist[i]);}}},'+':function(node){node=node.nextSibling;name=name.toUpperCase();while(node&&!node.tagName){node=node.nextSibling;}
if(node&&node.tagName===name){result.push(node);}},'>':function(node){node=node.firstChild;name=name.toUpperCase();while(node){if(node.tagName===name){result.push(node);}
node=node.nextSibling;}},'#':function(){var n=document.getElementById(name);if(n.tagName){result.push(n);}},'/':function(node){var nodes=node.childNodes;var i;var length=nodes.length;for(i=0;i<length;i+=1){result.push(nodes[i]);}},'*':function(node){star=true;walkTheDOM(node,function(node){result.push(node);},true);}};pecker={'.':function(node){var classy=' '+node.className+' ';return classy.indexOf(' '+name+' ')>=0;},'&':function(node){return node.name===name;},'_':function(node){return node.type===name;},'[':function(node){return typeof node[name]==='string';},'[=':function(node){var member=node[name];return typeof member==='string'&&member===value;},'[!=':function(node){var member=node[name];return typeof member==='string'&&member!==value;},'[^=':function(node){var member=node[name];return typeof member==='string'&&member.slice(0,member.length)===value;},'[$=':function(node){var member=node[name];return typeof member==='string'&&member.slice(-member.length)===value;},'[*=':function(node){var member=node[name];return typeof member==='string'&&member.indexOf(value)>=0;},'[~=':function(node){var member=node[name];if(typeof member==='string'){member=' '+member+' ';return member.indexOf(' '+value+' ')>=0;}},'[|=':function(node){var member=node[name];if(typeof member==='string'){member='-'+member+'-';return member.indexOf('-'+value+'-')>=0;}},':blur':function(node){return node!==has_focus;},':checked':function(node){return node.checked;},':disabled':function(node){return node.tagName&&node.disabled;},':enabled':function(node){return node.tagName&&!node.disabled;},':even':function(node){var f;if(node.tagName){f=flipflop;flipflop=!flipflop;return f;}
return false;},':focus':function(node){return node===has_focus;},':hidden':function(node){return node.tagName&&getStyleObject(node).visibility!=='visible';},':odd':function(node){if(node.tagName){flipflop=!flipflop;return flipflop;}
return false;},':tag':function(node){return node.tagName;},':text':function(node){return node.nodeName==='#text';},':trim':function(node){return node.nodeName!=='#text'||(/\W/.test(node.nodeValue));},':unchecked':function(node){return node.tagName&&!node.checked;},':visible':function(node){return node.tagName&&getStyleObject(node).visibility==='visible';}};function quest(query,nodes){var selector;var func;var i;var j;for(i=0;i<query.length;i+=1){selector=query[i];name=selector.name;func=hunter[selector.op];if(typeof func==='function'){if(star){error("ADsafe: Query violation: *"+selector.op+
(selector.name||''));}
result=[];for(j=0;j<nodes.length;j+=1){func(nodes[j]);}}else{value=selector.value;flipflop=false;func=pecker[selector.op];if(typeof func!=='function'){switch(selector.op){case':first':result=nodes.slice(0,1);break;case':rest':result=nodes.slice(1);break;default:error('ADsafe: Query violation: :'+selector.op);}}else{result=[];for(j=0;j<nodes.length;j+=1){if(func(nodes[j])){result.push(nodes[j]);}}}}
nodes=result;}
return result;}
function make_root(root,id){if(id){if(root.tagName!=='DIV'){error('ADsafe: Bad node.');}}else{if(root.tagName!=='BODY'){error('ADsafe: Bad node.');}}
function Bunch(nodes){this.___nodes___=nodes;this.___star___=star&&nodes.length>1;star=false;}
var allow_focus=true;var dom;var dom_event=function(ev){var key;var target;var that;var the_event;var the_target;var the_actual_event=ev||event;var type=the_actual_event.type;the_target=the_actual_event.target||the_actual_event.srcElement;target=new Bunch([the_target]);that=target;switch(type){case'mousedown':allow_focus=true;if(document.selection){the_range=document.selection.createRange();}
break;case'focus':case'focusin':allow_focus=true;has_focus=the_target;the_actual_event.cancelBubble=false;type='focus';break;case'blur':case'focusout':allow_focus=false;has_focus=null;type='blur';break;case'keypress':allow_focus=true;has_focus=the_target;key=String.fromCharCode(the_actual_event.charCode||the_actual_event.keyCode);switch(key){case'\u000d':case'\u000a':type='enterkey';break;case'\u001b':type='escapekey';break;}
break;case'click':allow_focus=true;break;}
if(the_actual_event.cancelBubble&&the_actual_event.stopPropagation){the_actual_event.stopPropagation();}
the_event={altKey:the_actual_event.altKey,ctrlKey:the_actual_event.ctrlKey,bubble:function(){try{var parent=that.getParent();var b=parent.___nodes___[0];that=parent;the_event.that=that;if(b['___ on ___']&&b['___ on ___'][type]){that.fire(the_event);}else{the_event.bubble();}}catch(e){error(e);}},key:key,preventDefault:function(){if(the_actual_event.preventDefault){the_actual_event.preventDefault();}
the_actual_event.returnValue=false;},shiftKey:the_actual_event.shiftKey,target:target,that:that,type:type,x:the_actual_event.clientX,y:the_actual_event.clientY};if(the_target['___ on ___']&&the_target['___ on ___'][the_event.type]){target.fire(the_event);}else{while(true){the_target=the_target.parentNode;if(!the_target){break;}
if(the_target['___ on ___']&&the_target['___ on ___'][the_event.type]){that=new Bunch([the_target]);the_event.that=that;that.fire(the_event);break;}
if(the_target['___adsafe root___']){break;}}}
if(the_event.type==='escapekey'){if(ephemeral){ephemeral.remove();}
ephemeral=null;}
that=null;the_actual_event=null;the_event=null;the_target=null;return;};root['___adsafe root___']='___adsafe root___';Bunch.prototype={append:function(appendage){reject_global(this);var b=this.___nodes___;var flag=false;var i;var j;var node;var rep;if(b.length===0||!appendage){return this;}
if(Array.isArray(appendage)){if(appendage.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){rep=appendage[i].___nodes___;for(j=0;j<rep.length;j+=1){b[i].appendChild(rep[j]);}}}else{if(typeof appendage!=='string'){rep=appendage.___nodes___;}
for(i=0;i<b.length;i+=1){node=b[i];if(rep){for(j=0;j<rep.length;j+=1){node.appendChild((flag)?rep[j].cloneNode(true):rep[j]);}
flag=true;}else{node.appendChild(document.createTextNode(appendage));}}}
return this;},blur:function(){reject_global(this);var b=this.___nodes___;var i;var node;has_focus=null;for(i=0;i<b.length;i+=1){node=b[i];if(node.blur){node.blur();}}
return this;},check:function(value){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.checked=!!value[i];}}}else{for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.checked=!!value;}}}
return this;},'class':function(value){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){if(/url/i.test(string_check(value[i]))){error('ADsafe error.');}
node=b[i];if(node.tagName){node.className=value[i];}}}else{if(/url/i.test(string_check(value))){error('ADsafe error.');}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.className=value;}}}
return this;},clone:function(deep,n){var a=[];var b=this.___nodes___;var c;var i;var j;var k=n||1;for(i=0;i<k;i+=1){c=[];for(j=0;j<b.length;j+=1){c.push(b[j].cloneNode(deep));}
a.push(new Bunch(c));}
return(n)?a:a[0];},count:function(){reject_global(this);return this.___nodes___.length;},each:function(func){reject_global(this);var b=this.___nodes___;var i;if(typeof func==='function'){for(i=0;i<b.length;i+=1){func(new Bunch([b[i]]));}
return this;}
error();},empty:function(){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){node=b[i];while(node.firstChild){purge_event_handlers(node);node.removeChild(node.firstChild);}}}else{for(i=0;i<b.length;i+=1){node=b[i];while(node.firstChild){purge_event_handlers(node);node.removeChild(node.firstChild);}}}
return this;},enable:function(enable){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(enable)){if(enable.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
enable.length);}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.disabled=!enable[i];}}}else{for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.disabled=!enable;}}}
return this;},ephemeral:function(){reject_global(this);if(ephemeral){ephemeral.remove();}
ephemeral=this;return this;},explode:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=new Bunch([b[i]]);}
return a;},fire:function(event){reject_global(this);var array;var b;var i;var j;var n;var node;var on;var type;if(typeof event==='string'){type=event;event={type:type};}else if(typeof event==='object'){type=event.type;}else{error();}
b=this.___nodes___;n=b.length;for(i=0;i<n;i+=1){node=b[i];on=node['___ on ___'];if(owns(on,type)){array=on[type];for(j=0;j<array.length;j+=1){array[j].call(this,event);}}}
return this;},focus:function(){reject_global(this);var b=this.___nodes___;if(b.length>0&&allow_focus){has_focus=b[0].focus();return this;}
error();},fragment:function(){reject_global(this);return new Bunch([document.createDocumentFragment()]);},getCheck:function(){return this.getChecks()[0];},getChecks:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].checked;}
return a;},getClass:function(){return this.getClasses()[0];},getClasses:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].className;}
return a;},getMark:function(){return this.getMarks()[0];},getMarks:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i]['_adsafe mark_'];}
return a;},getName:function(){return this.getNames()[0];},getNames:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].name;}
return a;},getOffsetHeight:function(){return this.getOffsetHeights()[0];},getOffsetHeights:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].offsetHeight;}
return a;},getOffsetWidth:function(){return this.getOffsetWidths()[0];},getOffsetWidths:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].offsetWidth;}
return a;},getParent:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;var n;for(i=0;i<b.length;i+=1){n=b[i].parentNode;if(n['___adsafe root___']){error('ADsafe parent violation.');}
a[i]=n;}
return new Bunch(a);},getSelection:function(){reject_global(this);var b=this.___nodes___;var end;var node;var start;var range;if(b.length===1&&allow_focus){node=b[0];if(typeof node.selectionStart==='number'){start=node.selectionStart;end=node.selectionEnd;return node.value.slice(start,end);}
range=node.createTextRange();range.expand('textedit');if(range.inRange(the_range)){return the_range.text;}}
return null;},getStyle:function(name){return this.getStyles(name)[0];},getStyles:function(name){reject_global(this);if(reject_name(name)){error("ADsafe style violation.");}
var a=[];var b=this.___nodes___;var i;var node;var s;for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){s=(name!=='float')?getStyleObject(node)[name]:getStyleObject(node).cssFloat||getStyleObject(node).styleFloat;if(typeof s==='string'){a[i]=s;}}}
return a;},getTagName:function(){return this.getTagNames()[0];},getTagNames:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;var tagName;for(i=0;i<b.length;i+=1){tagName=b[i].tagName;a[i]=(typeof tagName==='string')?tagName.toLowerCase():tagName;}
return a;},getTitle:function(){return this.getTitles()[0];},getTitles:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){a[i]=b[i].title;}
return a;},getValue:function(){return this.getValues()[0];},getValues:function(){reject_global(this);var a=[];var b=this.___nodes___;var i;var node;for(i=0;i<b.length;i+=1){node=b[i];if(node.nodeName==='#text'){a[i]=node.nodeValue;}else if(node.tagName&&node.type!=='password'){a[i]=node.value;if(!a[i]&&node.firstChild&&node.firstChild.nodeName==='#text'){a[i]=node.firstChild.nodeValue;}}}
return a;},indeterminate:function(value){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.indeterminate=!!value[i];}}}else{for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.indeterminate=!!value;}}}
return this;},klass:function(value){return this.class(value);},mark:function(value){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+
value.length);}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node['_adsafe mark_']=String(value[i]);}}}else{for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node['_adsafe mark_']=String(value);}}}
return this;},off:function(type){reject_global(this);var b=this.___nodes___;var i;var node;for(i=0;i<b.length;i+=1){node=b[i];if(typeof type==='string'){if(typeof node['___ on ___']==='object'){node['___ on ___'][type]=null;}}else{node['___ on ___']=null;}}
return this;},on:function(type,func){reject_global(this);if(typeof type!=='string'||typeof func!=='function'){error();}
var b=this.___nodes___;var i;var node;var on;var ontype;for(i=0;i<b.length;i+=1){node=b[i];if(type==='change'){ontype='on'+type;if(node[ontype]!==dom_event){node[ontype]=dom_event;}}
on=node['___ on ___'];if(!on){on={};node['___ on ___']=on;}
if(owns(on,type)){on[type].push(func);}else{on[type]=[func];}}
return this;},protect:function(){reject_global(this);var b=this.___nodes___;var i;for(i=0;i<b.length;i+=1){b[i]['___adsafe root___']='___adsafe root___';}
return this;},q:function(text){reject_global(this);star=this.___star___;return new Bunch(quest(parse_query(string_check(text),id),this.___nodes___));},remove:function(){reject_global(this);this.replace();},replace:function(replacement){reject_global(this);var b=this.___nodes___;var flag=false;var i;var j;var newnode;var node;var parent;var rep;if(b.length===0){return;}
for(i=0;i<b.length;i+=1){purge_event_handlers(b[i]);}
if(!replacement||replacement.length===0||(replacement.___nodes___&&replacement.___nodes___.length===0)){for(i=0;i<b.length;i+=1){node=b[i];purge_event_handlers(node);if(node.parentNode){node.parentNode.removeChild(node);}}}else if(Array.isArray(replacement)){if(replacement.length!==b.length){error('ADsafe: Array length: '+
b.length+'-'+value.length);}
for(i=0;i<b.length;i+=1){node=b[i];parent=node.parentNode;purge_event_handlers(node);if(parent){rep=replacement[i].___nodes___;if(rep.length>0){newnode=rep[0];parent.replaceChild(newnode,node);for(j=1;j<rep.length;j+=1){node=newnode;newnode=rep[j];parent.insertBefore(newnode,node.nextSibling);}}else{parent.removeChild(node);}}}}else{rep=replacement.___nodes___;for(i=0;i<b.length;i+=1){node=b[i];purge_event_handlers(node);parent=node.parentNode;if(parent){newnode=(flag)?rep[0].cloneNode(true):rep[0];parent.replaceChild(newnode,node);for(j=1;j<rep.length;j+=1){node=newnode;newnode=(flag)?rep[j].clone(true):rep[j];parent.insertBefore(newnode,node.nextSibling);}
flag=true;}}}
return this;},select:function(){reject_global(this);var b=this.___nodes___;if(b.length<1||!allow_focus){error();}
b[0].focus();b[0].select();return this;},selection:function(string){reject_global(this);string_check(string);var b=this.___nodes___;var end;var node;var old;var start;var range;if(b.length===1&&allow_focus){node=b[0];if(typeof node.selectionStart==='number'){start=node.selectionStart;end=node.selectionEnd;old=node.value;node.value=old.slice(0,start)+string+old.slice(end);node.selectionStart=start+string.length;node.selectionEnd=start+string.length;node.focus();}else{range=node.createTextRange();range.expand('textedit');if(range.inRange(the_range)){the_range.select();the_range.text=string;the_range.select();}}}
return this;},style:function(name,value){reject_global(this);if(reject_name(name)){error("ADsafe style violation.");}
if(value===undefined||(/url/i.test(string_check(value)))){error();}
var b=this.___nodes___;var i;var node;var v;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+
b.length+'-'+value.length);}
for(i=0;i<b.length;i+=1){node=b[i];v=string_check(value[i]);if(/url/i.test(v)){error();}
if(node.tagName){if(name!=='float'){node.style[name]=v;}else{node.style.cssFloat=v;node.style.styleFloat=v;}}}}else{v=string_check(value);if(/url/i.test(v)){error();}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){if(name!=='float'){node.style[name]=v;}else{node.style.cssFloat=v;node.style.styleFloat=v;}}}}
return this;},tag:function(tag,type,name){reject_global(this);var node;if(typeof tag!=='string'){error();}
if(makeableTagName[tag]!==true){error('ADsafe: Bad tag: '+tag);}
node=document.createElement(tag);if(name){node.autocomplete='off';node.name=string_check(name);}
if(type){node.type=string_check(type);}
return new Bunch([node]);},text:function(text){reject_global(this);var a;var i;if(Array.isArray(text)){a=[];for(i=0;i<text.length;i+=1){a[i]=document.createTextNode(string_check(text[i]));}
return new Bunch(a);}
return new Bunch([document.createTextNode(string_check(text))]);},title:function(value){reject_global(this);var b=this.___nodes___;var i;var node;if(Array.isArray(value)){if(value.length!==b.length){error('ADsafe: Array length: '+b.length+'-'+value.length);}
for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.title=string_check(value[i]);}}}else{string_check(value);for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){node.title=value;}}}
return this;},value:function(value){reject_global(this);if(value===undefined){error();}
var b=this.___nodes___;var i;var node;if(Array.isArray(value)&&b.length===value.length){for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){if(node.type!=='password'){if(typeof node.value==='string'){node.value=value[i];}else{while(node.firstChild){purge_event_handlers(node.firstChild);node.removeChild(node.firstChild);}
node.appendChild(document.createTextNode(String(value[i])));}}}else if(node.nodeName==='#text'){node.nodeValue=String(value[i]);}}}else{value=String(value);for(i=0;i<b.length;i+=1){node=b[i];if(node.tagName){if(node.tagName!=='BUTTON'&&typeof node.value==='string'){node.value=value;}else{while(node.firstChild){purge_event_handlers(node.firstChild);node.removeChild(node.firstChild);}
node.appendChild(document.createTextNode(value));}}else if(node.nodeName==='#text'){node.nodeValue=value;}}}
return this;}};dom={append:function(bunch){var b=(typeof bunch==='string')?[document.createTextNode(bunch)]:bunch.___nodes___;var i;var n;for(i=0;i<b.length;i+=1){n=b[i];if(typeof n==='string'||typeof n==='number'){n=document.createTextNode(String(n));}
root.appendChild(n);}
return dom;},combine:function(array){if(!array||!array.length){error('ADsafe: Bad combination.');}
var b=array[0].___nodes___;var i;for(i=0;i<array.length;i+=1){b=b.concat(array[i].___nodes___);}
return new Bunch(b);},count:function(){return 1;},ephemeral:function(bunch){if(ephemeral){ephemeral.remove();}
ephemeral=bunch;return dom;},fragment:function(){return new Bunch([document.createDocumentFragment()]);},prepend:function(bunch){var b=bunch.___nodes___;var i;for(i=0;i<b.length;i+=1){root.insertBefore(b[i],root.firstChild);}
return dom;},q:function(text){star=false;var query=parse_query(text,id);if(typeof hunter[query[0].op]!=='function'){error('ADsafe: Bad query: '+query[0]);}
return new Bunch(quest(query,[root]));},remove:function(){purge_event_handlers(root);root.parent.removeElement(root);root=null;},row:function(values){var tr=document.createElement('tr');var td;var i;for(i=0;i<values.length;i+=1){td=document.createElement('td');td.appendChild(document.createTextNode(String(values[i])));tr.appendChild(td);}
return new Bunch([tr]);},tag:function(tag,type,name){var node;if(typeof tag!=='string'){error();}
if(makeableTagName[tag]!==true){error('ADsafe: Bad tag: '+tag);}
node=document.createElement(tag);if(name){node.autocomplete='off';node.name=name;}
if(type){node.type=type;}
return new Bunch([node]);},text:function(text){var a;var i;if(Array.isArray(text)){a=[];for(i=0;i<text.length;i+=1){a[i]=document.createTextNode(string_check(text[i]));}
return new Bunch(a);}
return new Bunch([document.createTextNode(string_check(text))]);}};if(typeof root.addEventListener==='function'){root.addEventListener('focus',dom_event,true);root.addEventListener('blur',dom_event,true);root.addEventListener('mouseover',dom_event,true);root.addEventListener('mouseout',dom_event,true);root.addEventListener('mouseup',dom_event,true);root.addEventListener('mousedown',dom_event,true);root.addEventListener('mousemove',dom_event,true);root.addEventListener('click',dom_event,true);root.addEventListener('dblclick',dom_event,true);root.addEventListener('keypress',dom_event,true);}else{root.onclick=dom_event;root.ondblclick=dom_event;root.onfocusin=dom_event;root.onfocusout=dom_event;root.onkeypress=dom_event;root.onmouseout=dom_event;root.onmousedown=dom_event;root.onmousemove=dom_event;root.onmouseover=dom_event;root.onmouseup=dom_event;}
return[dom,Bunch.prototype];}
return{create:function(o){reject_global(o);return Object.create(o);},get:function(object,name){reject_global(object);if(!reject_property(object,name)){return object[name];}
error();},go:function(id,f){var dom;var fun;var root;var i;var scripts;if(adsafe_id&&adsafe_id!==id){error();}
root=document.getElementById(id);if(root.tagName!=='DIV'){error();}
adsafe_id=null;scripts=root.getElementsByTagName('script');i=scripts.length-1;if(i<0){error();}
do{root.removeChild(scripts[i]);i-=1;}while(i>=0);root=make_root(root,id);dom=root[0];for(i=0;i<interceptors.length;i+=1){fun=interceptors[i];if(typeof fun==='function'){try{fun(id,dom,adsafe_lib,root[1]);}catch(e1){ADSAFE.log(e1);}}}
try{f(dom,adsafe_lib);}catch(e2){ADSAFE.log(e2);}
root=null;adsafe_lib=null;},has:function(object,name){return owns(object,name);},id:function(id){if(adsafe_id){error();}
adsafe_id=id;adsafe_lib={};},isArray:Array.isArray||function(value){return Object.prototype.toString.apply(value)==='[object Array]';},keys:Object.keys,later:function(func,timeout){if(typeof func==='function'){setTimeout(func,timeout||0);}else{error();}},lib:function(name,f){if(!adsafe_id||reject_name(name)){error("ADsafe lib violation.");}
adsafe_lib[name]=f(adsafe_lib);},log:function log(s){if(window.console){console.log(s);}else if(typeof Debug==='object'){Debug.writeln(s);}else{opera.postError(s);}},remove:function(object,name){if(!reject_property(object,name)){delete object[name];return;}
error();},set:function(object,name,value){reject_global(object);if(!reject_property(object,name)){object[name]=value;return;}
error();},_intercept:function(f){interceptors.push(f);}};}());var REPORT=(function(){"use strict";var rx_amp=/&/g;var rx_gt=/>/g;var rx_lt=/</g;function entityify(string){return String(string).replace(rx_amp,"&amp;").replace(rx_lt,"&lt;").replace(rx_gt,"&gt;");}
return{error:function error_report(data){var fudge=+!!data.option.fudge;var output=[];if(data.stop){output.push("<center>J<u>SLint</u> was unable to finish.</center>");}
data.warnings.forEach(function(warning){output.push("<cite><address>",entityify(warning.line+fudge),".",entityify(warning.column+fudge),"</address>",entityify(warning.message),"</cite><samp>",entityify(data.lines[warning.line]||""),"</samp>");});return output.join("");},function:function function_report(data){var fudge=+!!data.option.fudge;var mode=(data.module)?"module":"global";var output=[];if(data.json){return(data.warnings.length===0)?"<center>JSON: good.</center>":"<center>JSON: bad.</center>";}
function detail(title,array){if(Array.isArray(array)&&array.length>0){output.push("<dt>",entityify(title),"</dt><dd>",array.join(", "),"</dd>");}}
if(data.functions.length===0){output.push("<center>There are no functions.</center>");}
var global=Object.keys(data.global.context).sort();var froms=data.froms.sort();var exports=Object.keys(data.exports).sort()
if(global.length+froms.length+exports.length>0){output.push("<dl class=level0>");detail(mode,global);detail("import from",froms);detail("export",exports);output.push("</dl>");}
if(data.functions.length>0){data.functions.forEach(function(the_function){var context=the_function.context;var list=Object.keys(context);output.push("<dl class=level",entityify(the_function.level),"><address>",entityify(the_function.line+fudge),"</address><dfn>",(the_function.name==="=>")?entityify(the_function.signature)+" =>":((typeof the_function.name==="string")?"<b>«"+entityify(the_function.name)
+"»</b>":"<b>"+entityify(the_function.name.id)
+"</b>")+entityify(the_function.signature),"</dfn>");if(Array.isArray(the_function.parameters)){var params=[];the_function.parameters.forEach(function extract(name){if(name.id==="{"||name.id==="["){name.names.forEach(extract);}else{if(name.id!=="ignore"){params.push(name.id);}}});detail("parameter",params.sort());}
list.sort();detail("variable",list.filter(function(id){var the_variable=context[id];return the_variable.role==="variable"&&the_variable.function===the_function;}));detail("exception",list.filter(function(id){return context[id].role==="exception";}));detail("closure",list.filter(function(id){var the_variable=context[id];return the_variable.closure===true&&the_variable.function===the_function;}));detail("outer",list.filter(function(id){var the_variable=context[id];return the_variable.function!==the_function&&the_variable.function.id!=="(global)";}));detail(mode,list.filter(function(id){return context[id].function.id==="(global)";}));detail("label",list.filter(function(id){return context[id].role==="label";}));output.push("</dl>");});}
output.push("<center>J<u>SLint</u> edition ",entityify(data.edition),"</center>");return output.join("");},property:function property_directive(data){var not_first=false;var output=["/*property"];var length=1111;var properties=Object.keys(data.property);if(properties.length>0){properties.sort().forEach(function(key){if(not_first){output.push(",");length+=2;}
not_first=true;if(length+key.length>78){length=4;output.push("\n   ");}
output.push(" ",key);length+=key.length;});output.push("\n*/\n");return output.join("");}}};}());