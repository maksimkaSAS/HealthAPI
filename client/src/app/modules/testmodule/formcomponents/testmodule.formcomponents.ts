export const testmoduleFormComponents = {
	formId: 'testmodule',
	title: 'Testmodule',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill testmodule title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill testmodule description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},

		{
			name: 'Text',
			key: 'testfield',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill testfield'
				},
				{
					name: 'Label',
					value: 'testfield'
				}
			]
		}
	]
};
