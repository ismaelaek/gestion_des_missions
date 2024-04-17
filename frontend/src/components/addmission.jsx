import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Cascader,
	Checkbox,
	ColorPicker,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Slider,
	Switch,
	TreeSelect,
	Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const AddMission = () => {
    const onChange = (value) => {
			console.log(`selected ${value}`);
		};
		const onSearch = (value) => {
			console.log("search:", value);
		};
	return (
		<main className=" container pt-5">
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
				style={{
					maxWidth: 600,
				}}>
				<Form.Item label="نوغ المهمة">
					<Input />
				</Form.Item>
				<Form.Item label="Select">
					<Select>
						<Select.Option value="demo">Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="RangePicker">
					<RangePicker />
				</Form.Item>
				<Form.Item label="الموظف">
					<Select
						showSearch
						placeholder="Select a person"
						optionFilterProp="children"
						onChange={onChange}
						onSearch={onSearch}
						options={[
							{
								value: "jack",
								label: "Jack",
							},
							{
								value: "lucy",
								label: "Lucy",
							},
							{
								value: "tom",
								label: "Tom",
							},
						]}
					/>
				</Form.Item>
				<Form.Item label="TextArea">
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item label="Switch" valuePropName="checked">
					<Switch />
				</Form.Item>
				<Form.Item
					label="Upload"
					valuePropName="fileList"
					getValueFromEvent={normFile}>
					<Upload action="/upload.do" listType="picture-card">
						<button
							style={{
								border: 0,
								background: "none",
							}}
							type="button">
							<PlusOutlined />
							<div
								style={{
									marginTop: 8,
								}}>
								Upload
							</div>
						</button>
					</Upload>
				</Form.Item>
				<Form.Item label="Button">
					<Button>Button</Button>
				</Form.Item>
				<Form.Item label="Slider">
					<Slider />
				</Form.Item>
				<Form.Item label="ColorPicker">
					<ColorPicker />
				</Form.Item>
			</Form>
		</main>
	);
};
export default AddMission;
