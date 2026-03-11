import Foundation

/// Tracks a student's progress through a lesson
struct LessonProgress: Identifiable, Codable {
    let id: UUID
    let studentId: UUID
    let lessonId: UUID
    let gradeLevel: GradeLevel
    let unit: Int
    let day: Int
    
    var startedAt: Date?
    var completedAt: Date?
    var currentPage: Int
    var totalPages: Int
    var answers: [PageAnswer]
    var timeSpent: TimeInterval // in seconds
    
    var isCompleted: Bool {
        completedAt != nil
    }
    
    var progressPercentage: Double {
        guard totalPages > 0 else { return 0 }
        return Double(currentPage) / Double(totalPages)
    }
    
    init(
        id: UUID = UUID(),
        studentId: UUID,
        lessonId: UUID,
        gradeLevel: GradeLevel,
        unit: Int,
        day: Int,
        startedAt: Date? = nil,
        completedAt: Date? = nil,
        currentPage: Int = 1,
        totalPages: Int = 11,
        answers: [PageAnswer] = [],
        timeSpent: TimeInterval = 0
    ) {
        self.id = id
        self.studentId = studentId
        self.lessonId = lessonId
        self.gradeLevel = gradeLevel
        self.unit = unit
        self.day = day
        self.startedAt = startedAt
        self.completedAt = completedAt
        self.currentPage = currentPage
        self.totalPages = totalPages
        self.answers = answers
        self.timeSpent = timeSpent
    }
}

struct PageAnswer: Identifiable, Codable {
    let id: UUID
    let pageNumber: Int
    let pageType: LessonPage.PageType
    let responses: [String: String]
    let answeredAt: Date
    
    init(
        id: UUID = UUID(),
        pageNumber: Int,
        pageType: LessonPage.PageType,
        responses: [String: String],
        answeredAt: Date = Date()
    ) {
        self.id = id
        self.pageNumber = pageNumber
        self.pageType = pageType
        self.responses = responses
        self.answeredAt = answeredAt
    }
}

/// Summary statistics for a student
struct StudentStats: Codable {
    let studentId: UUID
    let totalLessonsCompleted: Int
    let currentStreak: Int // consecutive days
    let totalTimeSpent: TimeInterval
    let averageTimePerLesson: TimeInterval
    let completionPercentage: Double
    let lastActivityDate: Date?
    
    var formattedTotalTime: String {
        let hours = Int(totalTimeSpent) / 3600
        let minutes = (Int(totalTimeSpent) % 3600) / 60
        if hours > 0 {
            return "\(hours)h \(minutes)m"
        } else {
            return "\(minutes)m"
        }
    }
}
