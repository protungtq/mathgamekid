import { MiniGameIdea } from './types';

export const MINI_GAMES: MiniGameIdea[] = [
  // --- LỚP 1 (5-7 tuổi) ---
  {
    id: 'tower_builder', // Special case handled in App.tsx
    name: 'Xếp Tháp Số',
    icon: 'castle',
    category: 'arithmetic',
    type: 'builder',
    rules: 'Xếp gạch sao cho tổng số tầng bằng mục tiêu.',
    goal: 'Xây tháp chạm mây.',
    example: 'Cần 5 tầng. Xếp khối 2 và 3.',
    leveling: 'Cộng phạm vi 10-20.',
    grade: 1
  },
  {
    id: 'fish_catch',
    name: 'Bắt Cá Đúng Số',
    icon: 'fish',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn chú cá mang con số đúng theo yêu cầu.',
    goal: 'Thu thập cá.',
    example: 'Tìm số 5. Chọn cá số 5.',
    leveling: 'Nhận biết số 1-20.',
    grade: 1
  },
  {
    id: 'farm_harvest',
    name: 'Nông Trại Vui Vẻ',
    icon: 'carrot',
    category: 'arithmetic',
    type: 'collection',
    rules: 'Thu hoạch đủ số lượng nông sản yêu cầu.',
    goal: 'Làm nông dân.',
    example: 'Cần 5 cà rốt. Chọn luống 2 và 3.',
    leveling: 'Cộng phạm vi 10.',
    grade: 1
  },
  {
    id: 'gift_box',
    name: 'Hộp Quà Bí Ẩn',
    icon: 'gift',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn nắp hộp có đáp án đúng để đóng gói quà.',
    goal: 'Đóng gói quà.',
    example: '3 + 2 = ?. Chọn nắp số 5.',
    leveling: 'Cộng trừ đơn giản.',
    grade: 1
  },
  {
    id: 'color_match',
    name: 'Bóng Màu Phép Tính',
    icon: 'palette',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn quả bóng có màu và kết quả đúng.',
    goal: 'Phân loại bóng.',
    example: 'Bóng đỏ = 5. Chọn bóng đỏ.',
    leveling: 'Nhận biết màu và số.',
    grade: 1
  },

  // --- LỚP 2 (7-8 tuổi) ---
  {
    id: 'path_finder',
    name: 'Mê Cung Số',
    icon: 'map',
    category: 'logic',
    type: 'choice',
    rules: 'Chọn ngã rẽ có phép tính đúng để đi tiếp.',
    goal: 'Tìm đường về đích.',
    example: 'Đi lối 5+5 hay 2+3 để được 10?',
    leveling: 'Cộng trừ có nhớ.',
    grade: 2
  },
  {
    id: 'puzzle_sum',
    name: 'Mảnh Ghép Toán Học',
    icon: 'puzzle',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn mảnh ghép còn thiếu để hoàn thiện bức tranh.',
    goal: 'Ghép tranh.',
    example: '5 + ? = 12. Chọn 7.',
    leveling: 'Tìm số hạng chưa biết.',
    grade: 2
  },
  {
    id: 'balance_scale',
    name: 'Cân Bằng Số',
    icon: 'scale',
    category: 'logic',
    type: 'choice',
    rules: 'Đặt quả cân vào để hai bên bằng nhau.',
    goal: 'Giữ thăng bằng.',
    example: 'Bên trái 15. Bên phải 5 + ?.',
    leveling: 'So sánh số.',
    grade: 2
  },
  {
    id: 'bridge_builder',
    name: 'Kỹ Sư Xây Cầu',
    icon: 'hammer',
    category: 'geometry',
    type: 'collection',
    rules: 'Chọn các đoạn cầu phù hợp để nối liền bờ sông.',
    goal: 'Thông xe qua cầu.',
    example: 'Khoảng trống 10m. Chọn 6m và 4m.',
    leveling: 'Độ dài đoạn thẳng.',
    grade: 2
  },
  {
    id: 'bubble_pop',
    name: 'Bắn Bóng Bay',
    icon: 'target',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Bắn vỡ quả bóng chứa đáp án đúng đang bay lên.',
    goal: 'Phản xạ nhanh.',
    example: '15 - 5 = ?. Bắn bóng 10.',
    leveling: 'Phép trừ trong 20.',
    grade: 2
  },

  // --- LỚP 3 (8-9 tuổi) ---
  {
    id: 'matrix_run',
    name: 'Ma Trận Số',
    icon: 'grid',
    category: 'logic',
    type: 'choice',
    rules: 'Tìm đường đi trong lưới số theo quy luật.',
    goal: 'Thoát khỏi ma trận.',
    example: 'Đi theo các số chia hết cho 2.',
    leveling: 'Bảng cửu chương.',
    grade: 3
  },
  {
    id: 'collect_items_mul',
    name: 'Siêu Thị Nhân Chia',
    icon: 'shopping-cart',
    category: 'arithmetic',
    type: 'collection',
    rules: 'Mua các combo sản phẩm theo phép nhân.',
    goal: 'Tính tiền nhanh.',
    example: 'Mua 3 gói kẹo, mỗi gói 5đ.',
    leveling: 'Phép nhân chia.',
    grade: 3
  },
  {
    id: 'treasure_hunt',
    name: 'Truy Tìm Kho Báu',
    icon: 'compass',
    category: 'logic',
    type: 'choice',
    rules: 'Giải mã bản đồ bằng các phép tính nhân chia.',
    goal: 'Tìm rương vàng.',
    example: 'Hướng Đông: 5x5. Hướng Tây: 3x8. Đi hướng lớn hơn.',
    leveling: 'So sánh tích/thương.',
    grade: 3
  },

  // --- LỚP 4 (9-10 tuổi) ---
  {
    id: 'ladder_climb',
    name: 'Bắc Thang Quy Luật',
    icon: 'align-justify', // closest to ladder
    category: 'logic',
    type: 'sequence',
    rules: 'Điền số còn thiếu để leo lên nấc thang tiếp theo.',
    goal: 'Leo lên đỉnh.',
    example: '2, 4, 8, 16... Chọn 32.',
    leveling: 'Dãy số quy luật.',
    grade: 4
  },
  {
    id: 'bridge_advanced',
    name: 'Cầu Treo Phức Tạp',
    icon: 'activity',
    category: 'logic',
    type: 'collection',
    rules: 'Xây cầu bằng biểu thức nhiều bước.',
    goal: 'Kiến trúc sư trưởng.',
    example: 'Cần 50. Chọn (10x4) và 10.',
    leveling: 'Biểu thức hỗn hợp.',
    grade: 4
  },

  // --- LỚP 5 (10-11 tuổi) ---
  {
    id: 'maze_master',
    name: 'Mê Cung Đại Số',
    icon: 'castle',
    category: 'logic',
    type: 'choice',
    rules: 'Giải các phương trình tìm x để mở cửa bí mật.',
    goal: 'Trùm cuối.',
    example: '2x + 5 = 15. Cửa nào là 5?',
    leveling: 'Tìm x cơ bản.',
    grade: 5
  }
];