import Foundation
import SwiftUI

/// Represents a student in the BedrockELA app
struct Student: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var gradeLevel: GradeLevel
    var avatarColor: Color
    var createdAt: Date
    var currentUnit: Int
    var currentDay: Int
    
    init(
        id: UUID = UUID(),
        name: String,
        gradeLevel: GradeLevel,
        avatarColor: Color = .blue,
        createdAt: Date = Date(),
        currentUnit: Int = 1,
        currentDay: Int = 1
    ) {
        self.id = id
        self.name = name
        self.gradeLevel = gradeLevel
        self.avatarColor = avatarColor
        self.createdAt = createdAt
        self.currentUnit = currentUnit
        self.currentDay = currentDay
    }
    
    enum CodingKeys: String, CodingKey {
        case id, name, gradeLevel, avatarColor, createdAt, currentUnit, currentDay
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(UUID.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        gradeLevel = try container.decode(GradeLevel.self, forKey: .gradeLevel)
        let colorHex = try container.decode(String.self, forKey: .avatarColor)
        avatarColor = Color(hex: colorHex) ?? .blue
        createdAt = try container.decode(Date.self, forKey: .createdAt)
        currentUnit = try container.decode(Int.self, forKey: .currentUnit)
        currentDay = try container.decode(Int.self, forKey: .currentDay)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(gradeLevel, forKey: .gradeLevel)
        try container.encode(avatarColor.toHex() ?? "#007AFF", forKey: .avatarColor)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(currentUnit, forKey: .currentUnit)
        try container.encode(currentDay, forKey: .currentDay)
    }
}

enum GradeLevel: String, Codable, CaseIterable {
    case first = "1st"
    case second = "2nd"
    case third = "3rd"
    case fourth = "4th"
    case fifth = "5th"
    case sixth = "6th"
    case seventh = "7th"
    case eighth = "8th"
    
    var displayName: String {
        "\(rawValue) Grade"
    }
    
    var totalUnits: Int { 6 }
    var daysPerUnit: Int { 30 }
    var totalDays: Int { 180 }
}

// MARK: - Color Hex Extensions

extension Color {
    init?(hex: String) {
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        var rgb: UInt64 = 0
        guard Scanner(string: hexSanitized).scanHexInt64(&rgb) else { return nil }
        
        let r = Double((rgb & 0xFF0000) >> 16) / 255.0
        let g = Double((rgb & 0x00FF00) >> 8) / 255.0
        let b = Double(rgb & 0x0000FF) / 255.0
        
        self.init(red: r, green: g, blue: b)
    }
    
    func toHex() -> String? {
        #if os(iOS)
        guard let components = UIColor(self).cgColor.components, components.count >= 3 else {
            return nil
        }
        #else
        guard let components = NSColor(self).cgColor.components, components.count >= 3 else {
            return nil
        }
        #endif
        let r = Int(components[0] * 255.0)
        let g = Int(components[1] * 255.0)
        let b = Int(components[2] * 255.0)
        return String(format: "#%02X%02X%02X", r, g, b)
    }
}
