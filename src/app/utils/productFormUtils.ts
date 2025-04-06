import { FormGroup } from "@angular/forms";

export class formUtils {
    static prepareFormData(formGroup: FormGroup, id: string | null, image: File | null): FormData {
        const formData = new FormData();
        const formValues = formGroup.getRawValue();
    
        formData.append('_method', id ? 'PUT' : 'POST');
        formData.append('name', formValues.name ?? '');
        formData.append('description', formValues.description ?? '');
        formData.append('category', formValues.category ?? '');
        formData.append('model', formValues.model ?? '');
        formData.append('brand', formValues.brand ?? '');
        formData.append('price', String(formValues.price ?? 0));
        formData.append('quantity', String(formValues.quantity ?? 0));
        formData.append('on_offer', formValues.on_offer ? '1' : '0');
        formData.append('discount', String(formValues.discount ?? 0));
        formData.append('featured', formValues.featured ? '1' : '0');
        
        if (image) {
            formData.append('image', image);
        }

        switch (formValues.category) {
            case 'ram':
                formData.append('speed', String(formValues.speed ?? 0));
                formData.append('memory', String(formValues.memory ?? 0));
                formData.append('memory_type', formValues.memory_type ?? '');
                formData.append('latency', String(formValues.latency ?? 0));
                break;
            case 'cpu':
                formData.append('socket', formValues.socket ?? '');
                formData.append('core_count', String(formValues.core_count ?? 0));
                formData.append('thread_count', String(formValues.thread_count ?? 0));
                formData.append('base_clock', String(formValues.base_clock ?? 0));
                formData.append('boost_clock', String(formValues.boost_clock ?? 0));
                formData.append('consumption', String(formValues.consumption ?? 0));
                formData.append('integrated_graphics', formValues.integrated_graphics ? '1' : '0');
                break;
            case 'gpu':
                formData.append('memory', String(formValues.memory ?? 0));
                formData.append('memory_type', formValues.memory_type ?? '');
                formData.append('core_clock', String(formValues.core_clock ?? 0));
                formData.append('boost_clock', String(formValues.boost_clock ?? 0));
                formData.append('consumption', String(formValues.consumption ?? 0));
                formData.append('length', String(formValues.length ?? 0));
                break;
            case 'motherboard':
                formData.append('socket', formValues.socket ?? '');
                formData.append('chipset', formValues.chipset ?? '');
                formData.append('form_factor', formValues.form_factor ?? '');
                formData.append('memory_max', String(formValues.memory_max ?? 0));
                formData.append('memory_slots', String(formValues.memory_slots ?? 0));
                formData.append('memory_type', formValues.memory_type ?? '');
                formData.append('memory_speed', String(formValues.memory_speed ?? 0));
                formData.append('sata_ports', String(formValues.sata_ports ?? 0));
                formData.append('m_2_slots', String(formValues.m_2_slots ?? 0));
                formData.append('pcie_slots', String(formValues.pcie_slots ?? 0));
                formData.append('usb_ports', String(formValues.usb_ports ?? 0));
                formData.append('lan', formValues.lan ?? '');
                formData.append('audio', formValues.audio ?? '');
                formData.append('wifi', formValues.wifi ? '1' : '0');
                formData.append('bluetooth', formValues.bluetooth ? '1' : '0');
                break;
            case 'storage':
                formData.append('type', formValues.type ?? '');
                formData.append('capacity', String(formValues.capacity ?? 0));
                formData.append('rpm', String(formValues.rpm ?? 0));
                formData.append('read_speed', String(formValues.read_speed ?? 0));
                formData.append('write_speed', String(formValues.write_speed ?? 0));
                break;
            case 'case':
                formData.append('case_type', formValues.case_type ?? '');
                formData.append('form_factor_support', formValues.form_factor_support ?? '');
                formData.append('tempered_glass', formValues.tempered_glass ? '1' : '0');
                formData.append('expansion_slots', String(formValues.expansion_slots ?? 0));
                formData.append('max_gpu_length', String(formValues.max_gpu_length ?? 0));
                formData.append('max_cpu_cooler_height', String(formValues.max_cpu_cooler_height ?? 0));
                formData.append('radiator_support', formValues.radiator_support ? '1' : '0');
                formData.append('extra_fans_connectors', String(formValues.extra_fans_connectors ?? 0));
                formData.append('depth', String(formValues.depth ?? 0));
                formData.append('width', String(formValues.width ?? 0));
                formData.append('height', String(formValues.height ?? 0));
                formData.append('weight', String(formValues.weight ?? 0));
                break;
            case 'psu':
                formData.append('efficiency_rating', formValues.efficiency_rating ?? '');
                formData.append('wattage', String(formValues.wattage ?? 0));
                formData.append('modular', formValues.modular ? '1' : '0');
                formData.append('fanless', formValues.fanless ? '1' : '0');
                break;
            case 'cooler':
                formData.append('type', formValues.type ?? '');
                formData.append('fan_rpm', String(formValues.fan_rpm ?? 0));
                formData.append('consumption', String(formValues.consumption ?? 0));
                formData.append('socket_support', formValues.socket_support ?? '');
                formData.append('width', String(formValues.width ?? 0));
                formData.append('height', String(formValues.height ?? 0));
                break;
            case 'display':
                formData.append('resolution', formValues.resolution ?? '');
                formData.append('refresh_rate', String(formValues.refresh_rate ?? 0));
                formData.append('response_time', String(formValues.response_time ?? 0));
                formData.append('panel_type', formValues.panel_type ?? '');
                formData.append('aspect_ratio', formValues.aspect_ratio ?? '');
                formData.append('curved', formValues.curved ? '1' : '0');
                formData.append('brightness', String(formValues.brightness ?? 0));
                formData.append('contrast_ratio', formValues.contrast_ratio ?? '');
                formData.append('sync_type', formValues.sync_type ?? '');
                formData.append('hdmi_ports', String(formValues.hdmi_ports ?? 0));
                formData.append('display_ports', String(formValues.display_ports ?? 0));
                formData.append('inches', String(formValues.inches ?? 0));
                formData.append('weight', String(formValues.weight ?? 0));
                break;
            case 'keyboard':
                formData.append('switch_type', formValues.switch_type ?? '');
                formData.append('width', String(formValues.width ?? 0));
                formData.append('height', String(formValues.height ?? 0));
                formData.append('weight', String(formValues.weight ?? 0));
                break;
            case 'mouse':
                formData.append('dpi', String(formValues.dpi ?? 0));
                formData.append('sensor', formValues.sensor ?? '');
                formData.append('buttons', String(formValues.buttons ?? 0));
                formData.append('bluetooth', formValues.bluetooth ? '1' : '0');
                formData.append('weight', String(formValues.weight ?? 0));
                break;
            default:
                break;
        }

        return formData;
    }
}