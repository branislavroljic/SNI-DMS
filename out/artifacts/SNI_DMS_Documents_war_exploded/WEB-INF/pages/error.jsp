<%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 12. 1. 2022.
  Time: 23:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h3>Doslo je do greske!</h3>
    <p><%=session.getAttribute("notification")!=null?session.getAttribute("notification").toString():""%></p>
</body>
</html>
