<script></script>
<template>
  <div>
    <h1>디테일 페이지</h1>
    <p>도서 번호 : {{ $route.params.id.replace("-", " ") }}</p>
  </div>
</template>
