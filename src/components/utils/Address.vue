<template>
  <div id="address">
    <div class="block">
      <el-cascader v-model="address" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data() {
    return {
    	address:[],
    	options:[
    	{
    		value:"河南",
    		label:"河南",
    		children:[
    			{
    				value:"郑州市",
    				label:"郑州市",
    				children:[
    					{
    						value:"二七区",
    						label:"二七区",

    					}
    				]
    			}
    		]
    	}
    	]
    }
  },
  methods: {
    handleChange(value) {
      this.$emit("getAddressFromChild",value)
    }
  }
}

</script>
<style>
</style>
