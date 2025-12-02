import { MiniGameIdea } from './types';

export const MINI_GAMES: MiniGameIdea[] = [
  // --- LỚP 1 (5-7 tuổi) ---
  {
    id: 'tower_builder',
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
    id: 'drag_calc',
    name: 'Kéo Thả Phép Tính',
    icon: 'puzzle', // Replacing with generic puzzle icon
    category: 'arithmetic',
    type: 'drag_match',
    rules: 'Kéo số vào ô trống để hoàn thành phép tính.',
    goal: 'Giải đố.',
    example: '7 + __ = 12. Kéo số 5.',
    leveling: 'Cộng trừ đơn giản.',
    grade: 1
  },
  {
    id: 'farm_harvest',
    name: 'Thu Thập Nông Sản',
    icon: 'carrot',
    category: 'arithmetic',
    type: 'collection',
    rules: 'Thu hoạch đủ số lượng nông sản yêu cầu.',
    goal: 'Làm nông dân giỏi.',
    example: 'Cần 5 cà rốt. Chọn luống 2 và 3.',
    leveling: 'Cộng phạm vi 10.',
    grade: 1
  },
  {
    id: 'color_match',
    name: 'Bóng Màu Phép Tính',
    icon: 'palette',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn bóng có màu và kết quả đúng.',
    goal: 'Phân loại bóng.',
    example: 'Bóng đỏ = 5. Chọn bóng đỏ.',
    leveling: 'Nhận biết màu và số.',
    grade: 1
  },
  {
    id: 'fish_catch',
    name: 'Bắt Cá Đúng Số',
    icon: 'fish',
    category: 'arithmetic',
    type: 'comparison',
    rules: 'Chọn cá có số lớn hơn/nhỏ hơn theo yêu cầu.',
    goal: 'Ngư dân tài ba.',
    example: 'Bắt cá > 7.',
    leveling: 'So sánh số.',
    grade: 1
  },
  {
    id: 'gift_box',
    name: 'Đóng Hộp Quà',
    icon: 'gift',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Chọn nắp hộp có đáp án đúng.',
    goal: 'Xưởng quà tặng.',
    example: '12 - 5 = ?. Chọn 7.',
    leveling: 'Phép trừ.',
    grade: 1
  },

  // --- LỚP 2 (7-8 tuổi) ---
  {
    id: 'path_finder',
    name: 'Chọn Đường Đi Đúng',
    icon: 'map',
    category: 'logic',
    type: 'choice',
    rules: 'Chọn ngã rẽ có kết quả đúng.',
    goal: 'Đi xuyên rừng.',
    example: 'Rẽ trái (5+5) hay phải (2+3) để được 10?',
    leveling: 'Cộng trừ có nhớ.',
    grade: 2
  },
  {
    id: 'puzzle_sum',
    name: 'Puzzle Toán Học',
    icon: 'puzzle',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Giải phép tính để mở mảnh ghép.',
    goal: 'Hoàn thiện tranh.',
    example: '3 x 4 = ?. Chọn 12.',
    leveling: 'Phép nhân cơ bản.',
    grade: 2
  },
  {
    id: 'balance_scale',
    name: 'Cân Bằng Hai Bên',
    icon: 'scale',
    category: 'logic',
    type: 'choice', // Simplified to choice for engine
    rules: 'Chọn số để cân bằng hai bên.',
    goal: 'Giữ thăng bằng.',
    example: 'Trái: 3+4. Phải: __+2. Chọn 5.',
    leveling: 'Biểu thức đơn giản.',
    grade: 2
  },
  {
    id: 'bridge_builder',
    name: 'Xây Cầu Bằng Số',
    icon: 'hammer',
    category: 'geometry',
    type: 'collection',
    rules: 'Đặt khối số vào chỗ trống để cầu liền mạch.',
    goal: 'Qua sông.',
    example: '__ + 4 = 9. Chọn 5.',
    leveling: 'Tìm số hạng.',
    grade: 2
  },
  {
    id: 'bubble_pop',
    name: 'Bắn Bóng Số',
    icon: 'target',
    category: 'arithmetic',
    type: 'choice',
    rules: 'Bắn bóng tạo thành tổng đúng.',
    goal: 'Xạ thủ.',
    example: 'Tổng 15. Bắn 6 và 9.',
    leveling: 'Phản xạ nhanh.',
    grade: 2
  },

  // --- LỚP 3 (8-9 tuổi) ---
  {
    id: 'matrix_run',
    name: 'Ma Trận Số',
    icon: 'grid',
    category: 'logic',
    type: 'choice',
    rules: 'Chọn ô số tiếp theo theo quy luật để tìm đường.',
    goal: 'Thoát ma trận.',
    example: '5 + __ = 9. Chọn 4.',
    leveling: 'Logic tìm đường.',
    grade: 3
  },
  {
    id: 'collect_upgrade',
    name: 'Siêu Thị Nâng Cấp',
    icon: 'shopping-cart',
    category: 'arithmetic',
    type: 'collection',
    rules: 'Thu thập vật phẩm để nâng cấp nhân vật.',
    goal: 'Mua sắm.',
    example: 'Mua 3 món giá 5đ.',
    leveling: 'Nhân chia.',
    grade: 3
  },
  {
    id: 'treasure_hunt',
    name: 'Tìm Kho Báu',
    icon: 'compass',
    category: 'logic',
    type: 'choice',
    rules: 'Giải phép tính để định hướng đi.',
    goal: 'Tìm rương vàng.',
    example: 'Đi lên (6+3) hay xuống (10-2)?',
    leveling: 'Định hướng.',
    grade: 3
  },

  // --- LỚP 4 (9-10 tuổi) ---
  {
    id: 'ladder_climb',
    name: 'Bắc Thang Quy Luật',
    icon: 'align-justify',
    category: 'logic',
    type: 'sequence',
    rules: 'Điền số vào dãy quy luật để leo thang.',
    goal: 'Leo núi.',
    example: '2, 4, 6, __. Chọn 8.',
    leveling: 'Dãy số.',
    grade: 4
  },
  {
    id: 'bridge_advanced',
    name: 'Xây Cầu Liên Hoàn',
    icon: 'activity',
    category: 'logic',
    type: 'collection',
    rules: 'Xây cầu bằng chuỗi phép tính.',
    goal: 'Kiến trúc sư.',
    example: '( __ x 3 ) + 2 = 14. Chọn 4.',
    leveling: 'Biểu thức phức tạp.',
    grade: 4
  },

  // --- LỚP 5 (10-11 tuổi) ---
  {
    id: 'maze_calc',
    name: 'Mê Cung Phép Tính',
    icon: 'castle',
    category: 'logic',
    type: 'choice',
    rules: 'Giải phương trình để mở cửa mê cung.',
    goal: 'Thoát hiểm.',
    example: '2a + 3b = 17.',
    leveling: 'Tư duy đại số.',
    grade: 5
  }
];