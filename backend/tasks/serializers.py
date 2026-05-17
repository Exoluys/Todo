from rest_framework import serializers

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    priority = serializers.ReadOnlyField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'priority', 'due_date', 'is_complete', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
