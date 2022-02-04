<%@ attribute name="list" type="java.util.List" required="true" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="fileTags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${!empty list}">
    <ul>
        <c:forEach var="file" items="${list}">
            <li><c:out value="${file.name}"/></li>
            <fileTags:fileHierarchy list="${file.listFiles()}"></fileTags:fileHierarchy>
        </c:forEach>
    </ul>
</c:if>
