/*
 Data plugin for Highcharts

 (c) 2012-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(i){var k=i.each,s=HighchartsAdapter.inArray,u=i.splat,j,r=function(b,a){this.init(b,a)};i.extend(r.prototype,{init:function(b,a){this.options=b;this.chartOptions=a;this.columns=b.columns||this.rowsToColumns(b.rows)||[];this.rawColumns=[];this.columns.length?this.dataFound():(this.parseCSV(),this.parseTable(),this.parseGoogleSpreadsheet())},getColumnDistribution:function(){var b=this.chartOptions,a=this.options,e=[],f=function(b){return(i.seriesTypes[b||"line"].prototype.pointArrayMap||[0]).length},
d=b&&b.chart&&b.chart.type,c=[],g=[],m,h;k(b&&b.series||[],function(b){c.push(f(b.type||d))});k(a&&a.seriesMapping||[],function(b){e.push(b.x||0)});e.length===0&&e.push(0);k(a&&a.seriesMapping||[],function(a){var e=new j,q,o=c[m]||f(d),p=i.seriesTypes[((b&&b.series||[])[m]||{}).type||d||"line"].prototype.pointArrayMap||["y"];e.addColumnReader(a.x,"x");for(q in a)a.hasOwnProperty(q)&&q!=="x"&&e.addColumnReader(a[q],q);for(h=0;h<o;h++)e.hasReader(p[h])||e.addColumnReader(void 0,p[h]);g.push(e);m++});
a=i.seriesTypes[d||"line"].prototype.pointArrayMap;a===void 0&&(a=["y"]);this.valueCount={global:f(d),xColumns:e,individual:c,seriesBuilders:g,globalPointArrayMap:a}},dataFound:function(){if(this.options.switchRowsAndColumns)this.columns=this.rowsToColumns(this.columns);this.getColumnDistribution();this.parseTypes();this.findHeaderRow();this.parsed()!==!1&&this.complete()},parseCSV:function(){var b=this,a=this.options,e=a.csv,f=this.columns,d=a.startRow||0,c=a.endRow||Number.MAX_VALUE,g=a.startColumn||
0,m=a.endColumn||Number.MAX_VALUE,h,n,t=0;e&&(n=e.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(a.lineDelimiter||"\n"),h=a.itemDelimiter||(e.indexOf("\t")!==-1?"\t":","),k(n,function(a,e){var n=b.trim(a),i=n.indexOf("#")===0;e>=d&&e<=c&&!i&&n!==""&&(n=a.split(h),k(n,function(b,a){a>=g&&a<=m&&(f[a-g]||(f[a-g]=[]),f[a-g][t]=b)}),t+=1)}),this.dataFound())},parseTable:function(){var b=this.options,a=b.table,e=this.columns,f=b.startRow||0,d=b.endRow||Number.MAX_VALUE,c=b.startColumn||0,g=b.endColumn||
Number.MAX_VALUE;a&&(typeof a==="string"&&(a=document.getElementById(a)),k(a.getElementsByTagName("tr"),function(a,b){b>=f&&b<=d&&k(a.children,function(a,d){if((a.tagName==="TD"||a.tagName==="TH")&&d>=c&&d<=g)e[d-c]||(e[d-c]=[]),e[d-c][b-f]=a.innerHTML})}),this.dataFound())},parseGoogleSpreadsheet:function(){var b=this,a=this.options,e=a.googleSpreadsheetKey,f=this.columns,d=a.startRow||0,c=a.endRow||Number.MAX_VALUE,g=a.startColumn||0,m=a.endColumn||Number.MAX_VALUE,h,n;e&&jQuery.ajax({dataType:"json",
url:"https://spreadsheets.google.com/feeds/cells/"+e+"/"+(a.googleSpreadsheetWorksheet||"od6")+"/public/values?alt=json-in-script&callback=?",error:a.error,success:function(a){var a=a.feed.entry,e,i=a.length,k=0,j=0,l;for(l=0;l<i;l++)e=a[l],k=Math.max(k,e.gs$cell.col),j=Math.max(j,e.gs$cell.row);for(l=0;l<k;l++)if(l>=g&&l<=m)f[l-g]=[],f[l-g].length=Math.min(j,c-d);for(l=0;l<i;l++)if(e=a[l],h=e.gs$cell.row-1,n=e.gs$cell.col-1,n>=g&&n<=m&&h>=d&&h<=c)f[n-g][h-d]=e.content.$t;b.dataFound()}})},findHeaderRow:function(){this.headerRow=
0},trim:function(b,a){typeof b==="string"&&(b=b.replace(/^\s+|\s+$/g,""),a&&/^[0-9\s]+$/.test(b)&&(b=b.replace(/\s/g,"")));return b},parseTypes:function(){for(var b=this.columns,a=b.length;a--;)this.parseColumn(b[a],a)},parseColumn:function(b,a){var e=this.rawColumns,f=this.columns,d=b.length,c,g,m,h,i=s(a,this.valueCount.xColumns)!==-1,k=[],j=this.chartOptions,o,p=(this.options.columnTypes||[])[a],j=i&&(j&&j.xAxis&&u(j.xAxis)[0].type==="category"||p==="string");for(e[a]=[];d--;)if(c=k[d]||b[d],m=
e[a][d]=this.trim(c),h=this.trim(c,!0),g=parseFloat(h),j||d===0)b[d]=m;else if(+h===g)b[d]=g,g>31536E6&&p!=="float"?b.isDatetime=!0:b.isNumeric=!0,b[d+1]!==void 0&&(o=g>b[d+1]);else if(g=this.parseDate(c),i&&typeof g==="number"&&!isNaN(g)&&p!=="float"){if(k[d]=c,b[d]=g,b.isDatetime=!0,b[d+1]!==void 0){c=g>b[d+1];if(c!==o&&o!==void 0)this.alternativeFormat?(this.dateFormat=this.alternativeFormat,d=b.length,this.alternativeFormat=this.dateFormats[this.dateFormat].alternative):b.unsorted=!0;o=c}}else if(b[d]=
m===""?null:m,d!==0&&(b.isDatetime||b.isNumeric))b.mixed=!0;i&&b.mixed&&(f[a]=e[a]);if(i&&o&&this.options.sort){e=typeof f[0][0]!=="number";for(a=0;a<f.length;a++)f[a].reverse(),e&&f[a].unshift(f[a].pop())}},dateFormats:{"YYYY-mm-dd":{regex:/^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,parser:function(b){return Date.UTC(+b[1],b[2]-1,+b[3])}},"dd/mm/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(b){return Date.UTC(+b[3],b[2]-1,+b[1])},alternative:"mm/dd/YYYY"},
"mm/dd/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(b){return Date.UTC(+b[3],b[1]-1,+b[2])}},"dd/mm/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(b){return Date.UTC(+b[3]+2E3,b[2]-1,+b[1])},alternative:"mm/dd/YY"},"mm/dd/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(b){return Date.UTC(+b[3]+2E3,b[1]-1,+b[2])}}},parseDate:function(b){var a=this.options.parseDate,e,f,d=this.options.dateFormat||
this.dateFormat,c;a&&(e=a(b));if(typeof b==="string"){if(d)a=this.dateFormats[d],(c=b.match(a.regex))&&(e=a.parser(c));else for(f in this.dateFormats)if(a=this.dateFormats[f],c=b.match(a.regex)){this.dateFormat=f;this.alternativeFormat=a.alternative;e=a.parser(c);break}c||(c=Date.parse(b),typeof c==="object"&&c!==null&&c.getTime?e=c.getTime()-c.getTimezoneOffset()*6E4:typeof c==="number"&&!isNaN(c)&&(e=c-(new Date(c)).getTimezoneOffset()*6E4))}return e},rowsToColumns:function(b){var a,e,f,d,c;if(b){c=
[];e=b.length;for(a=0;a<e;a++){d=b[a].length;for(f=0;f<d;f++)c[f]||(c[f]=[]),c[f][a]=b[a][f]}}return c},parsed:function(){if(this.options.parsed)return this.options.parsed.call(this,this.columns)},getFreeIndexes:function(b,a){var e,f,d=[],c=[],g;for(f=0;f<b;f+=1)d.push(!0);for(e=0;e<a.length;e+=1){g=a[e].getReferencedColumnIndexes();for(f=0;f<g.length;f+=1)d[g[f]]=!1}for(f=0;f<d.length;f+=1)d[f]&&c.push(f);return c},complete:function(){var b=this.columns,a,e=this.options,f,d,c,g,i=[],h;if(e.complete||
e.afterComplete){for(c=0;c<b.length;c++)if(this.headerRow===0)b[c].name=b[c].shift();f=[];d=this.getFreeIndexes(b.length,this.valueCount.seriesBuilders);for(c=0;c<this.valueCount.seriesBuilders.length;c++)h=this.valueCount.seriesBuilders[c],h.populateColumns(d)&&i.push(h);for(;d.length>0;){h=new j;h.addColumnReader(0,"x");c=s(0,d);c!==-1&&d.splice(c,1);for(c=0;c<this.valueCount.global;c++)h.addColumnReader(void 0,this.valueCount.globalPointArrayMap[c]);h.populateColumns(d)&&i.push(h)}i.length>0&&
i[0].readers.length>0&&(h=b[i[0].readers[0].columnIndex],h!==void 0&&(h.isDatetime?a="datetime":h.isNumeric||(a="category")));if(a==="category")for(c=0;c<i.length;c++){h=i[c];for(d=0;d<h.readers.length;d++)if(h.readers[d].configName==="x")h.readers[d].configName="name"}for(c=0;c<i.length;c++){h=i[c];d=[];for(g=0;g<b[0].length;g++)d[g]=h.read(b,g);f[c]={data:d};if(h.name)f[c].name=h.name}b={series:f};if(a)b.xAxis={type:a};e.complete&&e.complete(b);e.afterComplete&&e.afterComplete(b)}}});i.Data=r;i.data=
function(b,a){return new r(b,a)};i.wrap(i.Chart.prototype,"init",function(b,a,e){var f=this;a&&a.data?i.data(i.extend(a.data,{afterComplete:function(d){var c,g;if(a.hasOwnProperty("series"))if(typeof a.series==="object")for(c=Math.max(a.series.length,d.series.length);c--;)g=a.series[c]||{},a.series[c]=i.merge(g,d.series[c]);else delete a.series;a=i.merge(d,a);b.call(f,a,e)}}),a):b.call(f,a,e)});j=function(){this.readers=[];this.pointIsArray=!0};j.prototype.populateColumns=function(b){var a=!0;k(this.readers,
function(a){if(a.columnIndex===void 0)a.columnIndex=b.shift()});k(this.readers,function(b){b.columnIndex===void 0&&(a=!1)});return a};j.prototype.read=function(b,a){var e=this.pointIsArray,f=e?[]:{},d;k(this.readers,function(c){var d=b[c.columnIndex][a];e?f.push(d):f[c.configName]=d});if(this.name===void 0&&this.readers.length>=2&&(d=this.getReferencedColumnIndexes(),d.length>=2))d.shift(),d.sort(),this.name=b[d.shift()].name;return f};j.prototype.addColumnReader=function(b,a){this.readers.push({columnIndex:b,
configName:a});if(!(a==="x"||a==="y"||a===void 0))this.pointIsArray=!1};j.prototype.getReferencedColumnIndexes=function(){var b,a=[],e;for(b=0;b<this.readers.length;b+=1)e=this.readers[b],e.columnIndex!==void 0&&a.push(e.columnIndex);return a};j.prototype.hasReader=function(b){var a,e;for(a=0;a<this.readers.length;a+=1)if(e=this.readers[a],e.configName===b)return!0}})(Highcharts);
