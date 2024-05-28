<template>
    <div class="flex justify-between p-1">
        <!-- En html en dt es un description term -->
        <dt class="font-bold">
            <slot name="label" />
        </dt>

        <!-- Descriptio details -->
        <dd class="text-gray-900">
            <slot></slot>
            
        </dd>
</div>
</template>

