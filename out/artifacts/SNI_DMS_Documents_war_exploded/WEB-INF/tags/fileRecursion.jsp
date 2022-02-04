<c:forEach var="node" items="${node.children}">
    <!-- TODO: print the node here -->
    <c:set var="node" value="${node}" scope="request"/>
    <jsp:include page="node.jsp"/>
</c:forEach>