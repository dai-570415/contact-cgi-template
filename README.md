| ファイル名                     | 一般サーバー | suEXECサーバー<br>CGIWrapサーバー | 転送モード | 
| ------------------------------ | ------------ | --------------------------------- | ---------- | 
| postmail.cgi<br>check.cgi      | 755 or 705   | 701 or 700                        | アスキー   | 
| init.cgi                       | 666 or 604   | 601 or 600                        | アスキー   | 
| data/log.cgi<br>data/ses.cgi   | 666 or 606   | 600                               | アスキー   | 
| lib/**<br>tmpl/**<br>style.css | -            | -                                 | アスキー   | 