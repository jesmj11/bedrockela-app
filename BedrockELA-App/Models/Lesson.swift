import Foundation

/// Represents a single lesson in the curriculum
struct Lesson: Identifiable, Codable, Hashable {
    let id: UUID
    let gradeLevel: GradeLevel
    let unit: Int
    let day: Int
    let title: String
    let bookTitle: String
    let chapterNumber: Int
    let chapterTitle: String
    let pages: [LessonPage]
    
    var displayTitle: String {
        "Day \(day): \(chapterTitle)"
    }
    
    var isAssessmentDay: Bool {
        [5, 10, 15, 20, 25, 30].contains(day % 30)
    }
}

struct LessonPage: Identifiable, Codable, Hashable {
    let id: UUID
    let pageNumber: Int
    let type: PageType
    let content: PageContent
    
    enum PageType: String, Codable {
        case title
        case objectives
        case vocabulary
        case vocabGame
        case story
        case comprehension
        case grammar
        case language
        case informationalText
        case writing
        case journal
        case completion
    }
}

enum PageContent: Codable, Hashable {
    case title(TitleContent)
    case objectives(ObjectivesContent)
    case vocabulary(VocabularyContent)
    case vocabGame(VocabGameContent)
    case story(StoryContent)
    case comprehension(ComprehensionContent)
    case grammar(GrammarContent)
    case language(LanguageContent)
    case informationalText(InfoTextContent)
    case writing(WritingContent)
    case journal(JournalContent)
    case completion(CompletionContent)
}

// MARK: - Content Types

struct TitleContent: Codable, Hashable {
    let day: Int
    let gradeLevel: String
    let bookTitle: String
    let chapterNumber: Int
    let week: Int
}

struct ObjectivesContent: Codable, Hashable {
    let objectives: [String]
    let estimatedTime: String
}

struct VocabularyContent: Codable, Hashable {
    let words: [VocabWord]
}

struct VocabWord: Codable, Hashable, Identifiable {
    let id: UUID
    let word: String
    let definition: String?
    let minWords: Int
}

struct VocabGameContent: Codable, Hashable {
    let words: [String]
    let definitions: [String]
}

struct StoryContent: Codable, Hashable {
    let title: String
    let partNumber: Int
    let totalParts: Int
    let text: String
}

struct ComprehensionContent: Codable, Hashable {
    let questions: [ComprehensionQuestion]
}

struct ComprehensionQuestion: Codable, Hashable, Identifiable {
    let id: UUID
    let number: Int
    let text: String
    let minWords: Int?
}

struct GrammarContent: Codable, Hashable {
    let topic: String
    let explanation: String
    let example: String
    let prompt: String
}

struct LanguageContent: Codable, Hashable {
    let topic: String
    let explanation: String
    let example: String
    let prompt: String
}

struct InfoTextContent: Codable, Hashable {
    let title: String
    let text: String
    let questions: [ComprehensionQuestion]
}

struct WritingContent: Codable, Hashable {
    let prompt: String
    let tips: String?
    let minSentences: Int?
}

struct JournalContent: Codable, Hashable {
    let prompt: String
    let subtext: String?
}

struct CompletionContent: Codable, Hashable {
    let message: String
    let encouragement: String
}
