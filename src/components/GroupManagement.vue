<template>
  <v-container fluid>
    <v-card width="100%">
      <v-card-title>
				<v-btn color="primary" dark class="mb-2" @click="addRole">添加角色</v-btn>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
			<v-container fluid grid-list-lg>
				<v-layout row wrap v-if="roles.length > 0">
					<v-flex md3 v-for="role in roles" :key="role.id">
						<v-card max-height="300" style="overflow-y:auto;min-height:280px">
							<v-card-title class="py-1">
								<h4>{{ role.name }}</h4>
								<v-spacer></v-spacer>
								<v-btn icon small @click="addPermissions(role.id)"><v-icon color="primary" title="添加权限">add</v-icon></v-btn>
								<v-btn icon small><v-icon color="error" @click="deleteRole(role.id)" title="删除角色">delete</v-icon></v-btn>
							</v-card-title>
      			  <v-divider></v-divider>
							<v-container>
								<v-layout row wrap>
									<v-flex v-for="permission in role.permissions" :key="permission.id">
										<v-chip close @input="removePermissionFromRole(role.id,permission.id)">{{ permission.name }}</v-chip>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
				<v-layout v-else>
					<p>暂无角色信息</p>
				</v-layout>
			</v-container>
    </v-card>

		<v-dialog v-model="selectPermissionDialog" max-width="800">
			<v-card>
				<v-card-text>
					<v-container>
						<v-layout row wrap>
							<v-flex v-for="permission in unselectedPermissions" :key="permission.id" md3>
								<v-checkbox :label="permission.name" hide-details :value="permission.id" multiple v-model="selectedPermissions"></v-checkbox>
							</v-flex>
						</v-layout>
					</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click="selectPermissionDialog = false">关闭</v-btn>
          <v-btn color="info" @click="addPermissionsForRole">保存</v-btn>
        </v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog max-width="800" v-model="addRoleDialog">
      <v-card>
        <v-card-text>
					<v-text-field label="角色名" v-model="newRoleName" hide-details></v-text-field>
					<v-container>
						<v-layout row wrap>
							<v-flex v-for="permission in permissions" :key="permission.id" md3>
								<v-checkbox :label="permission.name" hide-details :value="permission.id" multiple v-model="selectedPermissions"></v-checkbox>
							</v-flex>
						</v-layout>
					</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click="addRoleDialog = false">关闭</v-btn>
          <v-btn color="info" @click="saveRole">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
      {{ snackbarText }}
      <v-btn color="white" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import store from '@/store.js'
export default {
	data:() => ({
		addRoleDialog: false,
		selectPermissionDialog: false,
		snackbar: false,
		snackbarColor: '',
		snackbarText: '',
		snackbarTimeout: 2000,
		roles: [],
		unselectedPermissions: null,
		selectedPermissions: [],
		roleId: null,
		permissions: [],
		newRoleName: '',
		self_permissions: JSON.parse(localStorage.getItem('permissions'))
	}),
	methods:{
		getRolesFromApi(){
			return new Promise((resolve,reject) => {
				axios({
					method: 'GET',
					url: "get/roles/",
					headers:{
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				}).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error.response)
        })
			})
		},
		getPermissionsUnselectedFromAPi(roleId){
			return new Promise((resolve,reject) => {
				axios({
					method: 'GET',
					url: 'permissions/',
					params: {
						not_in: roleId
					},
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				}).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error.response)
				})
			})
		},
		getPermissionsFromApi(){
			return new Promise((resolve,reject) => {
				axios({
					method: 'GET',
					url: 'permissions/',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				}).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error.response)
				})
			})
		},
		addPermissions(roleId){
			this.roleId = roleId
			this.getPermissionsUnselectedFromAPi(roleId)
			.then(success => {
				this.unselectedPermissions = success.data
			})
			this.selectPermissionDialog = true
		},
		addPermissionsForRole(){
			axios({
				method: 'POST',
				url: 'roles/'+this.roleId+'/permissions/',
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token")
				},
				data: {
					permissionsId: this.selectedPermissions
				}
			}).then(response => {
				var index = this.roles.findIndex(function(element){
          return element.name == response.data.name
        })
				this.$set(this.roles,index,response.data)
				this.selectPermissionDialog = false
				this.selectedPermissions = []
			}).catch(error => {
				this.selectPermissionDialog = false
				this.snackbarColor = 'error'
				this.snackbarText = error.response.data.message
				this.snackbar = true
				this.selectedPermissions = []
			})
		},
		removePermissionFromRole(roleId,permissionId){
			axios({
				method: 'DELETE',
				url: 'roles/'+roleId+'/permissions/'+permissionId+'/',
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token")
				},
			}).then(response => {
				var index = this.roles.findIndex(function(element){
          return element.name == response.data.name
        })
				this.$set(this.roles,index,response.data)
				this.selectPermissionDialog = false
			}).catch(error => {
				this.selectPermissionDialog = false
				this.snackbarColor = 'error'
				this.snackbarText = error.response.data.message
				this.snackbar = true
			})
		},
		addRole(){
			if(this.self_permissions.includes('add_role') || this.self_permissions.includes('all_permission') || this.self_permissions.includes('sys_setting')) {
				this.getPermissionsFromApi()
						.then(success => {
							this.permissions = success.data
						})
				this.addRoleDialog = true
			}else{
				this.snackbarColor = 'error'
				this.snackbarText = '无操作权限'
				this.snackbar = true
				return false
			}
		},
		saveRole(){
			if(this.newRoleName === ''){
				this.snackbarColor = 'error'
				this.snackbarText = '角色名不能为空'
				this.snackbar = true
				return false
			}
			axios({
				method: 'POST',
				url: 'roles/',
				data: {
					permissionsId: this.selectedPermissions,
					name: this.newRoleName
				},
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token")
				}
			}).then(response => {
				this.roles.push(response.data)
				this.newRoleName = ''
				this.selectedPermissions = []
				this.addRoleDialog = false
			}).catch(error => {
				this.snackbarColor = 'error'
				this.snackbarText = error.response.data.message
				this.snackbar = true
				this.selectedPermissions = []
			})
		},
		deleteRole(roleId){
			if(this.self_permissions.includes('delete_role')  || this.self_permissions.includes('all_permission') || this.self_permissions.includes('sys_setting')) {
				axios({
					method: 'DELETE',
					url: 'roles/' + roleId + '/',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				}).then(response => {
					var index = this.roles.findIndex(function (element) {
						return element.id == roleId
					})
					this.roles.splice(index, 1)
					this.snackbarColor = 'success'
					this.snackbarText = response.data.message
					this.snackbar = true
				}).catch(error => {
					this.snackbarColor = 'error'
					this.snackbarText = error.response.data.message
					this.snackbar = true
				})
			}else{
				this.snackbarColor = 'error'
				this.snackbarText = '无操作权限'
				this.snackbar = true
				return false
			}
		}
	},
	created(){
		this.getRolesFromApi()
		.then(success => {
			this.roles = success.data
		}).catch(error => {
			this.snackbar = 'error'
			this.snackbarText = error.data.message
			this.snackbar = true
		})
	}
}
</script>
