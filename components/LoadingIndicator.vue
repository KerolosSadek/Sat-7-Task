<template>
    <div class="loading-container">
        <div class="loading-line"></div>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
}

.loading-line {
    width: 80px;
    height: 10px;
    margin-top:80px;
    background-color: #9B7029;
    position: relative;
    animation: rotate 1s infinite linear;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
