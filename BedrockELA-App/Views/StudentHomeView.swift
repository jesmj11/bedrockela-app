import SwiftUI

struct StudentHomeView: View {
    @EnvironmentObject var appState: AppState
    @State private var showingLessonList = false
    
    var student: Student {
        appState.selectedStudent ?? Student(name: "Unknown", gradeLevel: .sixth)
    }
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Welcome header
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Welcome back,")
                            .font(.title2)
                            .foregroundColor(.secondary)
                        Text(student.name)
                            .font(.largeTitle)
                            .fontWeight(.bold)
                    }
                    .padding(.horizontal)
                    
                    // Current progress card
                    CurrentLessonCard(student: student)
                        .padding(.horizontal)
                    
                    // Quick stats
                    StatsRow(student: student)
                        .padding(.horizontal)
                    
                    // Continue button
                    Button {
                        showingLessonList = true
                    } label: {
                        Label("Continue Learning", systemImage: "play.circle.fill")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
            .navigationTitle(student.gradeLevel.displayName)
            .toolbar {
                ToolbarItem(placement: .navigation) {
                    Button {
                        appState.selectedStudent = nil
                    } label: {
                        Label("Switch Student", systemImage: "arrow.left")
                    }
                }
            }
            .sheet(isPresented: $showingLessonList) {
                LessonListView()
            }
        }
    }
}

struct CurrentLessonCard: View {
    let student: Student
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Current Lesson")
                    .font(.headline)
                Spacer()
                Text("Unit \(student.currentUnit)")
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.blue.opacity(0.2))
                    .cornerRadius(4)
            }
            
            Text("Day \(student.currentDay)")
                .font(.title)
                .fontWeight(.bold)
            
            Text("The Adventures of Tom Sawyer")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            ProgressView(value: Double(student.currentDay), total: 30)
                .tint(.blue)
        }
        .padding()
        .background(Color.blue.opacity(0.1))
        .cornerRadius(12)
    }
}

struct StatsRow: View {
    let student: Student
    
    var body: some View {
        HStack(spacing: 20) {
            StatItem(title: "Completed", value: "\(student.currentDay - 1)", icon: "checkmark.circle.fill")
            StatItem(title: "Current Unit", value: "\(student.currentUnit)", icon: "book.fill")
            StatItem(title: "Days Left", value: "\(180 - student.currentDay)", icon: "calendar")
        }
    }
}

struct StatItem: View {
    let title: String
    let value: String
    let icon: String
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.blue)
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
    }
}

struct LessonListView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        NavigationStack {
            List {
                ForEach(1...30, id: \.self) { day in
                    LessonRow(day: day)
                }
            }
            .navigationTitle("All Lessons")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
        }
    }
}

struct LessonRow: View {
    let day: Int
    
    var isAssessment: Bool {
        [5, 10, 15, 20, 25, 30].contains(day)
    }
    
    var body: some View {
        HStack {
            Image(systemName: isAssessment ? "doc.text.fill" : "book.fill")
                .foregroundColor(isAssessment ? .orange : .blue)
            
            VStack(alignment: .leading) {
                Text("Day \(day)")
                    .font(.headline)
                Text(isAssessment ? "Assessment" : "Chapter \(day)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding(.vertical, 4)
    }
}

struct ParentDashboardView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        NavigationStack {
            Text("Parent Dashboard")
                .font(.largeTitle)
            
            List(appState.students) { student in
                VStack(alignment: .leading) {
                    Text(student.name)
                        .font(.headline)
                    Text("Day \(student.currentDay) of 180")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .navigationTitle("Parent Mode")
            .toolbar {
                ToolbarItem(placement: .automatic) {
                    Button("Exit") {
                        appState.isParentMode = false
                    }
                }
            }
        }
    }
}

#Preview {
    StudentHomeView()
        .environmentObject(AppState())
}
