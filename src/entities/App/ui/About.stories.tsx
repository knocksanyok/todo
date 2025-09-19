import type { Meta, StoryObj } from '@storybook/react-vite'

import About from './About'
import { fn } from 'storybook/test'

const meta = {
	title: 'Groups/About',
	component: About,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		version: {
			control: 'number',
		},
		onClick: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		title: 'BIG TITLE',
		version: '2.0.0',
		onClick: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '800px', height: '400px', backgroundColor: 'red' }}>
				<Story />
			</div>
		),
	],
}
